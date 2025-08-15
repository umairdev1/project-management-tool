# Custom Decorators

This directory contains custom decorators for the Project Management Tool.

## Available Decorators

### `@Public()`

Marks a route as public (no authentication required).

```typescript
@Public()
@Post('login')
async login(@Body() loginDto: LoginDto) {
  // This endpoint is accessible without authentication
}
```

### `@AuthUser(property?)`

Unified decorator to extract user information from JWT token. By default, returns the full user object.

```typescript
// Get full user object (recommended approach)
@Get('profile')
async getProfile(@AuthUser() user: AuthUser) {
  // user = { userId: '123', email: 'user@example.com', role: 'string' }
  return this.usersService.findById(user.userId);
}

// Get specific property (when you only need one value)
@Get('user-id')
async getUserId(@AuthUser('userId') userId: string) {
  // userId = '123'
}

// Get user email
@Get('user-email')
async getUserEmail(@AuthUser('email') email: string) {
  // email = 'user@example.com'
}

// Get user role
@Get('user-role')
async getUserRole(@AuthUser('role') role: string) {
  // role = 'string'
}
```

## Usage Examples

### Basic Authentication

```typescript
@Controller('users')
export class UsersController {
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@AuthUser() user: AuthUser) {
    return this.usersService.findById(user.userId);
  }
}
```

### Public Routes

```typescript
@Controller('auth')
export class AuthController {
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // This endpoint is accessible without authentication
    return this.authService.login(loginDto);
  }
}
```

## Implementation Details

- **`@Public()`**: Uses NestJS metadata to mark routes as public
- **`@AuthUser()`**: Extracts user data from the JWT token stored in `req.user`
- Both decorators work seamlessly with the `JwtAuthGuard` for route protection
