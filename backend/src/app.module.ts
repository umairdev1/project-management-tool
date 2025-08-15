import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';

// Core Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ChatModule } from './modules/chat/chat.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ReportsModule } from './modules/reports/reports.module';
import { FilesModule } from './modules/files/files.module';
import { ActivityModule } from './modules/activity/activity.module';

// Shared Modules
import { SharedModule } from './shared/shared.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Database
    DatabaseModule,

    // Rate Limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 100,
      },
    ]),

    // Scheduled Tasks
    ScheduleModule.forRoot(),

    // Core Feature Modules
    AuthModule,
    UsersModule,
    ProjectsModule,
    TasksModule,
    ChatModule, // Now includes WebSocket functionality
    NotificationsModule,
    ReportsModule,
    FilesModule,
    ActivityModule,

    // Shared & Infrastructure Modules
    SharedModule,
  ],
})
export class AppModule {}
