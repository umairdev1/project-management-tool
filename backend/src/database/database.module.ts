import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as entities from '../entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'password'),
        database: configService.get('DB_NAME', 'project_management'),
        entities: Object.values(entities),
        synchronize: true,
        logging: configService.get('NODE_ENV') === 'development',
        migrations: [__dirname + '/migrations/*.ts'],
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
