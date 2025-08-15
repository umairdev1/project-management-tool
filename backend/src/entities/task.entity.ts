import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';
import { Subtask } from './subtask.entity';
import { FileAttachment } from './file-attachment.entity';
import { ActivityLog } from './activity-log.entity';
import { ChatMessage } from './chat-message.entity';
import { Notification } from './notification.entity';

// Enums
export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum TaskType {
  FEATURE = 'feature',
  BUG = 'bug',
  IMPROVEMENT = 'improvement',
  DOCUMENTATION = 'documentation',
  TESTING = 'testing',
  OTHER = 'other',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  @Column({
    type: 'enum',
    enum: TaskType,
    default: TaskType.FEATURE,
  })
  type: TaskType;

  @Column({ type: 'date', nullable: true })
  dueDate?: Date;

  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', nullable: true })
  completedAt?: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  progress: number; // 0-100

  @Column({ type: 'int', default: 0 })
  estimatedHours?: number;

  @Column({ type: 'int', default: 0 })
  actualHours?: number;

  @Column({ type: 'int', default: 0 })
  storyPoints?: number;

  @Column({ nullable: true })
  tags?: string; // Comma-separated tags

  @Column({ default: false })
  isSubtask: boolean;

  @Column({ nullable: true })
  parentTaskId?: string;

  @Column({ default: 0 })
  order: number; // For kanban board ordering

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>; // Additional custom fields

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne('Project', 'tasks')
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  projectId: string;

  @ManyToOne('User', 'assignedTasks')
  @JoinColumn({ name: 'assigneeId' })
  assignee?: User;

  @Column({ nullable: true })
  assigneeId?: string;

  @ManyToOne('User', 'createdTasks')
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column()
  createdById: string;

  @OneToMany('Subtask', 'parentTask')
  subtasks: Subtask[];

  @OneToMany('FileAttachment', 'task')
  attachments: FileAttachment[];

  @OneToMany('ActivityLog', 'task')
  activities: ActivityLog[];

  @OneToMany('ChatMessage', 'task')
  comments: ChatMessage[];

  @OneToMany('Notification', 'task')
  notifications: Notification[];

  // Virtual properties
  get isOverdue(): boolean {
    if (!this.dueDate) return false;
    return new Date() > this.dueDate && this.status !== TaskStatus.COMPLETED;
  }

  get daysRemaining(): number {
    if (!this.dueDate) return 0;
    const now = new Date();
    const due = new Date(this.dueDate);
    const diffTime = due.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  get isCompleted(): boolean {
    return this.status === TaskStatus.COMPLETED;
  }

  get isInProgress(): boolean {
    return this.status === TaskStatus.IN_PROGRESS;
  }

  get isHighPriority(): boolean {
    return (
      this.priority === TaskPriority.HIGH ||
      this.priority === TaskPriority.URGENT
    );
  }

  get hasSubtasks(): boolean {
    return this.subtasks && this.subtasks.length > 0;
  }

  get completedSubtasksCount(): number {
    return this.subtasks
      ? this.subtasks.filter((st) => st.status === TaskStatus.COMPLETED).length
      : 0;
  }

  get totalSubtasksCount(): number {
    return this.subtasks ? this.subtasks.length : 0;
  }
}
