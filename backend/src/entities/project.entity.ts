import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { ProjectMember } from './project-member.entity';
import { Task } from './task.entity';
import { ChatRoom } from './chat-room.entity';
import { ActivityLog } from './activity-log.entity';
import { FileAttachment } from './file-attachment.entity';
import { Notification } from './notification.entity';
import { ProjectTag } from './project-tag.entity';

// Enums
export enum ProjectStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum ProjectPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.PLANNED,
  })
  status: ProjectStatus;

  @Column({
    type: 'enum',
    enum: ProjectPriority,
    default: ProjectPriority.MEDIUM,
  })
  priority: ProjectPriority;

  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @Column({ type: 'date', nullable: true })
  actualEndDate?: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  progress: number; // 0-100

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  budget?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  actualCost?: number;

  @Column({ nullable: true })
  clientName?: string;

  @Column({ nullable: true })
  clientEmail?: string;

  @Column({ nullable: true })
  clientPhone?: string;

  @Column({ default: false })
  isPublic: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne('User', 'projectMemberships')
  owner: User;

  @Column()
  ownerId: string;

  @OneToMany('ProjectMember', 'project')
  members: ProjectMember[];

  @OneToMany('Task', 'project')
  tasks: Task[];

  @OneToMany('ChatRoom', 'project')
  chatRooms: ChatRoom[];

  @OneToMany('ActivityLog', 'project')
  activities: ActivityLog[];

  @OneToMany('FileAttachment', 'project')
  attachments: FileAttachment[];

  @OneToMany('Notification', 'project')
  notifications: Notification[];

  @OneToMany('ProjectTag', 'projects')
  tags: ProjectTag[];

  // Virtual properties
  get isOverdue(): boolean {
    if (!this.endDate) return false;
    return new Date() > this.endDate && this.status !== ProjectStatus.COMPLETED;
  }

  get daysRemaining(): number {
    if (!this.endDate) return 0;
    const now = new Date();
    const end = new Date(this.endDate);
    const diffTime = end.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  get isCompleted(): boolean {
    return this.status === ProjectStatus.COMPLETED;
  }
}
