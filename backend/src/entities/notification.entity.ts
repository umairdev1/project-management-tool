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

export enum NotificationType {
  TASK_ASSIGNED = 'task_assigned',
  TASK_UPDATED = 'task_updated',
  TASK_COMPLETED = 'task_completed',
  PROJECT_INVITE = 'project_invite',
  PROJECT_UPDATE = 'project_update',
  MENTION = 'mention',
  COMMENT = 'comment',
  DEADLINE_APPROACHING = 'deadline_approaching',
  DEADLINE_PASSED = 'deadline_passed',
  SYSTEM = 'system',
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
}

export enum DeliveryMethod {
  IN_APP = 'in_app',
  EMAIL = 'email',
  PUSH = 'push',
  SMS = 'sms',
}

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  @Column({
    type: 'enum',
    enum: NotificationPriority,
    default: NotificationPriority.MEDIUM,
  })
  priority: NotificationPriority;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.PENDING,
  })
  status: NotificationStatus;

  @Column({
    type: 'enum',
    enum: DeliveryMethod,
    default: DeliveryMethod.IN_APP,
  })
  deliveryMethod: DeliveryMethod;

  @Column({ nullable: true })
  userId: string; // Recipient

  @Column({ nullable: true })
  projectId?: string;

  @Column({ nullable: true })
  taskId?: string;

  @Column({ nullable: true })
  senderId?: string; // Who triggered the notification

  @Column({ nullable: true })
  readAt?: Date;

  @Column({ nullable: true })
  sentAt?: Date;

  @Column({ nullable: true })
  deliveredAt?: Date;

  @Column({ nullable: true })
  failedAt?: Date;

  @Column({ type: 'text', nullable: true })
  failureReason?: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>; // Additional data

  @Column({ type: 'jsonb', nullable: true })
  actions?: Array<{
    label: string;
    action: string;
    url?: string;
  }>; // Action buttons

  @Column({ default: false })
  isRead: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne('User', 'notifications')
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne('Project', 'notifications')
  @JoinColumn({ name: 'projectId' })
  project?: Project;

  @ManyToOne('Task', 'notifications')
  @JoinColumn({ name: 'taskId' })
  task?: Task;

  @ManyToOne('User')
  @JoinColumn({ name: 'senderId' })
  sender?: User;

  // Virtual properties
  get isHighPriority(): boolean {
    return (
      this.priority === NotificationPriority.HIGH ||
      this.priority === NotificationPriority.URGENT
    );
  }

  get isUrgent(): boolean {
    return this.priority === NotificationPriority.URGENT;
  }

  get isDelivered(): boolean {
    return (
      this.status === NotificationStatus.DELIVERED ||
      this.status === NotificationStatus.READ
    );
  }

  get isFailed(): boolean {
    return this.status === NotificationStatus.FAILED;
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
