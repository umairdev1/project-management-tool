import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthUser {
  userId: string;
  email: string;
  role: string;
}

export const AuthUser = createParamDecorator(
  (data: keyof AuthUser | 'id' | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return null;
    }

    // If a specific property is requested, return only that
    if (data) {
      return user[data];
    }

    // Return the full user object by default
    return user;
  },
);
