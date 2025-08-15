import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Task } from './task.entity';

export enum ActivityType {
  // User activities
  USER_LOGIN = 'user_login',
  USER_LOGOUT = 'user_logout',
  USER_REGISTER = 'user_register',
  USER_PROFILE_UPDATE = 'user_profile_update',
  PASSWORD_CHANGE = 'password_change',

  // Project activities
  PROJECT_CREATE = 'project_create',
  PROJECT_UPDATE = 'project_update',
  PROJECT_DELETE = 'project_delete',
  PROJECT_MEMBER_ADD = 'project_member_add',
  PROJECT_MEMBER_REMOVE = 'project_member_remove',
  PROJECT_MEMBER_ROLE_CHANGE = 'project_member_role_change',
  PROJECT_STATUS_CHANGE = 'project_status_change',

  // Task activities
  TASK_CREATE = 'task_create',
  TASK_UPDATE = 'task_update',
  TASK_DELETE = 'task_delete',
  TASK_ASSIGN = 'task_assign',
  TASK_STATUS_CHANGE = 'task_status_change',
  TASK_PRIORITY_CHANGE = 'task_priority_change',
  TASK_COMMENT = 'task_comment',

  // File activities
  FILE_UPLOAD = 'file_upload',
  FILE_DELETE = 'file_delete',
  FILE_DOWNLOAD = 'file_download',

  // Chat activities
  MESSAGE_SEND = 'message_send',
  MESSAGE_EDIT = 'message_edit',
  MESSAGE_DELETE = 'message_delete',

  // System activities
  SYSTEM_MAINTENANCE = 'system_maintenance',
  SYSTEM_ERROR = 'system_error',
  SYSTEM_UPDATE = 'system_update',
}

export enum ActivityLevel {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

@Entity('activity_logs')
export class ActivityLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ActivityType,
  })
  type: ActivityType;

  @Column({
    type: 'enum',
    enum: ActivityLevel,
    default: ActivityLevel.INFO,
  })
  level: ActivityLevel;

  @Column()
  action: string; // Human-readable action description

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  userId?: string; // Who performed the action

  @Column({ nullable: true })
  projectId?: string;

  @Column({ nullable: true })
  taskId?: string;

  @Column({ nullable: true })
  targetId?: string; // ID of the affected resource

  @Column({ nullable: true })
  targetType?: string; // Type of the affected resource

  @Column({ nullable: true })
  ipAddress?: string;

  @Column({ nullable: true })
  userAgent?: string;

  @Column({ type: 'jsonb', nullable: true })
  oldValues?: Record<string, any>; // Previous state

  @Column({ type: 'jsonb', nullable: true })
  newValues?: Record<string, any>; // New state

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>; // Additional context

  @Column({ nullable: true })
  sessionId?: string;

  @Column({ default: true })
  isVisible: boolean; // Whether to show in user activity feed

  @Column({ default: false })
  isSystem: boolean; // Whether this is a system-generated log

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne('User', 'activities')
  @JoinColumn({ name: 'userId' })
  user?: User;

  @ManyToOne('Project', 'activities')
  @JoinColumn({ name: 'projectId' })
  project?: Project;

  @ManyToOne('Task', 'activities')
  @JoinColumn({ name: 'taskId' })
  task?: Task;

  // Virtual properties
  get isUserActivity(): boolean {
    return !this.isSystem;
  }

  get isProjectActivity(): boolean {
    return !!this.projectId;
  }

  get isTaskActivity(): boolean {
    return !!this.taskId;
  }

  get isHighLevel(): boolean {
    return (
      this.level === ActivityLevel.ERROR ||
      this.level === ActivityLevel.CRITICAL
    );
  }

  get isWarning(): boolean {
    return this.level === ActivityLevel.WARNING;
  }

  get isError(): boolean {
    return (
      this.level === ActivityLevel.ERROR ||
      this.level === ActivityLevel.CRITICAL
    );
  }

  get hasChanges(): boolean {
    return !!(this.oldValues || this.newValues);
  }

  get changeSummary(): string {
    if (!this.hasChanges) return '';

    const changes: string[] = [];
    if (this.oldValues && this.newValues) {
      for (const key in this.newValues) {
        if (this.oldValues[key] !== this.newValues[key]) {
          changes.push(
            `${key}: ${this.oldValues[key]} → ${this.newValues[key]}`,
          );
        }
      }
    }
    return changes.join(', ');
  }

  get ageInMinutes(): number {
    const now = new Date();
    const created = new Date(this.createdAt);
    return Math.floor((now.getTime() - created.getTime()) / (1000 * 60));
  }

  get ageInHours(): number {
    return Math.floor(this.ageInMinutes / 60);
  }

  get ageInDays(): number {
    return Math.floor(this.ageInHours / 24);
  }
}
