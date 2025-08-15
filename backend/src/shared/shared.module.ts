import { Module, Global } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

// Guards
import { JwtAuthGuard } from './guards/jwt-auth.guard';

// Interceptors
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

// Filters
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Global()
@Module({
  providers: [
    // Global Guards
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    // Global Interceptors
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },

    // Global Filters
    HttpExceptionFilter,
  ],
})
export class SharedModule {}
