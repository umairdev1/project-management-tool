import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

import { User } from '../../entities/user.entity';
import {
  LoginDto,
  RegisterDto,
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto/auth.dto';
import {
  AuthResponseDto,
  UserResponseDto,
  TokenResponseDto,
  MessageResponseDto,
} from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create new user
    const user = this.userRepository.create({
      ...registerDto,
      role: registerDto.role || 'team_member',
      status: 'active',
    } as User);

    // Hash password
    await user.hashPassword();

    // Save user
    const savedUser = await this.userRepository.save(user);

    // Generate tokens
    const tokens = await this.generateTokens(savedUser);

    return tokens;
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    // Find user by email
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (user.status !== 'active') {
      throw new UnauthorizedException('Account is not active');
    }

    // Verify password
    const isPasswordValid = await user.validatePassword(loginDto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    user.lastLoginAt = new Date();
    await this.userRepository.save(user);

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return tokens;
  }

  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<MessageResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await user.validatePassword(
      changePasswordDto.currentPassword,
    );
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Change password
    await user.changePassword(changePasswordDto.newPassword);
    await this.userRepository.save(user);

    return {
      message: 'Password changed successfully',
      success: true,
    };
  }

  async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<MessageResponseDto> {
    const user = await this.userRepository.findOne({
      where: { email: forgotPasswordDto.email },
    });

    if (!user) {
      // Don't reveal if user exists or not
      return {
        message:
          'If an account with that email exists, a password reset link has been sent',
        success: true,
      };
    }

    // Generate reset token
    const resetToken = this.generateResetToken();
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour

    await this.userRepository.save(user);

    // TODO: Send email with reset link
    // await this.emailService.sendPasswordResetEmail(user.email, resetToken);

    return {
      message:
        'If an account with that email exists, a password reset link has been sent',
      success: true,
    };
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<MessageResponseDto> {
    const user = await this.userRepository.findOne({
      where: { passwordResetToken: resetPasswordDto.token },
    });

    if (
      !user ||
      !user.passwordResetExpires ||
      user.passwordResetExpires < new Date()
    ) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Reset password
    await user.changePassword(resetPasswordDto.newPassword);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await this.userRepository.save(user);

    return {
      message: 'Password reset successfully',
      success: true,
    };
  }

  async refreshToken(userId: string): Promise<TokenResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return await this.generateTokens(user);
  }

  async validateUser(userId: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user || user.status !== 'active') {
      throw new UnauthorizedException('User not found or inactive');
    }

    return this.mapUserToResponse(user);
  }

  private async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN', '24h'),
    });

    const refreshToken = this.jwtService.sign(
      { ...payload, type: 'refresh' },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '7d',
      },
    );

    const expiresIn = this.getTokenExpirationTime(
      this.configService.get('JWT_EXPIRES_IN', '24h'),
    );

    return {
      accessToken,
      refreshToken,
      expiresIn,
    };
  }

  private generateResetToken(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  private getTokenExpirationTime(expiresIn: string): number {
    const unit = expiresIn.slice(-1);
    const value = parseInt(expiresIn.slice(0, -1));

    switch (unit) {
      case 's':
        return value;
      case 'm':
        return value * 60;
      case 'h':
        return value * 60 * 60;
      case 'd':
        return value * 24 * 60 * 60;
      default:
        return 24 * 60 * 60; // Default to 24 hours
    }
  }

  private mapUserToResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      bio: user.bio,
      phone: user.phone,
      role: user.role,
      status: user.status,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      fullName: user.fullName,
    };
  }
}
