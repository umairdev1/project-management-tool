import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TaskStatus, TaskPriority } from './task.entity';
import { Task } from './task.entity';

@Entity('subtasks')
export class Subtask {
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

  @Column({ type: 'date', nullable: true })
  dueDate?: Date;

  @Column({ type: 'int', default: 0 })
  estimatedHours?: number;

  @Column({ type: 'int', default: 0 })
  actualHours?: number;

  @Column({ default: 0 })
  order: number; // For ordering within parent task

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne('Task', 'subtasks')
  @JoinColumn({ name: 'parentTaskId' })
  parentTask: Task;

  @Column()
  parentTaskId: string;

  // Virtual properties
  get isOverdue(): boolean {
    if (!this.dueDate) return false;
    return new Date() > this.dueDate && this.status !== TaskStatus.COMPLETED;
  }

  get isCompleted(): boolean {
    return this.status === TaskStatus.COMPLETED;
  }

  get isInProgress(): boolean {
    return this.status === TaskStatus.IN_PROGRESS;
  }
}
