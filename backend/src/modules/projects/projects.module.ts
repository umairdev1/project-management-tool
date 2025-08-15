import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project, ProjectMember, ProjectTag } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectMember, ProjectTag])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
