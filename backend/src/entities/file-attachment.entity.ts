import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { Task } from './task.entity';
import { User } from './user.entity';

export enum FileType {
  DOCUMENT = 'document',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  ARCHIVE = 'archive',
  OTHER = 'other',
}

export enum FileStatus {
  UPLOADING = 'uploading',
  PROCESSING = 'processing',
  READY = 'ready',
  FAILED = 'failed',
  DELETED = 'deleted',
}

@Entity('file_attachments')
export class FileAttachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalName: string;

  @Column()
  fileName: string; // Stored filename

  @Column()
  filePath: string; // Path to file in storage

  @Column()
  mimeType: string;

  @Column({ type: 'bigint' })
  fileSize: number; // Size in bytes

  @Column({
    type: 'enum',
    enum: FileType,
  })
  fileType: FileType;

  @Column({
    type: 'enum',
    enum: FileStatus,
    default: FileStatus.UPLOADING,
  })
  status: FileStatus;

  @Column({ nullable: true })
  projectId?: string;

  @Column({ nullable: true })
  taskId?: string;

  @Column({ nullable: true })
  userId?: string; // Who uploaded the file

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  tags?: string; // Comma-separated tags

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>; // File-specific metadata

  @Column({ nullable: true })
  thumbnailPath?: string; // For images/videos

  @Column({ nullable: true })
  processedAt?: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @Column({ default: false })
  isPublic: boolean; // Whether file can be accessed without authentication

  @Column({ default: 0 })
  downloadCount: number;

  @Column({ default: 0 })
  viewCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne('Project', 'attachments')
  @JoinColumn({ name: 'projectId' })
  project?: Project;

  @ManyToOne('Task', 'attachments')
  @JoinColumn({ name: 'taskId' })
  task?: Task;

  @ManyToOne('User')
  @JoinColumn({ name: 'userId' })
  user?: User;

  // Virtual properties
  get fileSizeInMB(): number {
    return this.fileSize / (1024 * 1024);
  }

  get fileSizeInKB(): number {
    return this.fileSize / 1024;
  }

  get isImage(): boolean {
    return this.fileType === FileType.IMAGE;
  }

  get isVideo(): boolean {
    return this.fileType === FileType.VIDEO;
  }

  get isAudio(): boolean {
    return this.fileType === FileType.AUDIO;
  }

  get isDocument(): boolean {
    return this.fileType === FileType.DOCUMENT;
  }

  get isArchive(): boolean {
    return this.fileType === FileType.ARCHIVE;
  }

  get hasThumbnail(): boolean {
    return !!this.thumbnailPath;
  }

  get isReady(): boolean {
    return this.status === FileStatus.READY;
  }

  get isFailed(): boolean {
    return this.status === FileStatus.FAILED;
  }

  get isDeleted(): boolean {
    return this.status === FileStatus.DELETED;
  }

  get extension(): string {
    return this.originalName.split('.').pop() || '';
  }

  get displayName(): string {
    return this.description || this.originalName;
  }
}
