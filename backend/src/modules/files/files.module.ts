import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FileAttachment } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([FileAttachment])],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
