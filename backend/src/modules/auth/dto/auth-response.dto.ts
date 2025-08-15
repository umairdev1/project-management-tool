import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from '../../../entities/user.entity';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ required: false })
  avatar?: string;

  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty({ enum: UserStatus })
  status: UserStatus;

  @ApiProperty()
  isEmailVerified: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export class AuthResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  expiresIn: number;
}

export class TokenResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  expiresIn: number;
}

export class MessageResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  success: boolean;
}
