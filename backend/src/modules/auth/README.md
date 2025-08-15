# Authentication Module

This module handles user authentication and authorization for the Project Management Tool.

## Features

- **User Registration**: Create new user accounts with role-based access control
- **User Login**: Secure authentication with JWT tokens
- **Password Management**: Change password, forgot password, and reset password functionality
- **Token Management**: Access tokens and refresh tokens with configurable expiration
- **Profile Management**: Get and update user profile information
- **Security**: Password hashing with bcrypt, JWT validation, and role-based guards

## API Endpoints

### Public Endpoints (No Authentication Required)

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token

### Protected Endpoints (Authentication Required)

- `POST /auth/change-password` - Change user password
- `POST /auth/refresh` - Refresh access token
- `GET /auth/profile` - Get current user profile
- `POST /auth/logout` - User logout

## DTOs

### Request DTOs

- `LoginDto` - Login credentials
- `RegisterDto` - User registration data
- `ChangePasswordDto` - Password change request
- `ForgotPasswordDto` - Password reset request
- `ResetPasswordDto` - Password reset with token
- `RefreshTokenDto` - Token refresh request

### Response DTOs

- `AuthResponseDto` - Authentication response with user and tokens
- `UserResponseDto` - User profile information
- `TokenResponseDto` - JWT tokens response
- `MessageResponseDto` - Generic message response

## Security Features

- **Password Hashing**: Uses bcrypt with configurable rounds
- **JWT Tokens**: Secure token-based authentication
- **Role-Based Access Control**: Different user roles with varying permissions
- **Input Validation**: Comprehensive validation using class-validator
- **Rate Limiting**: Protection against brute force attacks
- **CORS Protection**: Configurable cross-origin resource sharing

## Configuration

The module uses the following environment variables:

- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRES_IN` - Access token expiration time (default: 24h)
- `BCRYPT_ROUNDS` - Password hashing rounds (default: 12)

## Usage Example

```typescript
// Register a new user
const newUser = await authService.register({
  email: 'user@example.com',
  password: 'securePassword123',
  firstName: 'John',
  lastName: 'Doe',
  role: 'team_member',
});

// Login user
const authResult = await authService.login({
  email: 'user@example.com',
  password: 'securePassword123',
});

// Use the access token for authenticated requests
const headers = {
  Authorization: `Bearer ${authResult.accessToken}`,
};
```

## Testing

Run the authentication tests:

```bash
npm run test auth.service.spec.ts
```

## Dependencies

- `@nestjs/jwt` - JWT handling
- `@nestjs/passport` - Authentication strategies
- `@nestjs/typeorm` - Database operations
- `bcryptjs` - Password hashing
- `class-validator` - Input validation
- `@nestjs/swagger` - API documentation
