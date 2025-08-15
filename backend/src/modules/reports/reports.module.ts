import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Project, Task, User } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Task, User])],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
