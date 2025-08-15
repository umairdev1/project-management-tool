import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ChatRoom } from './chat-room.entity';
import { User } from './user.entity';
import { Task } from './task.entity';

export enum MessageType {
  TEXT = 'text',
  FILE = 'file',
  IMAGE = 'image',
  SYSTEM = 'system',
  TASK_COMMENT = 'task_comment',
}

export enum MessageStatus {
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
}

@Entity('chat_messages')
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'enum',
    enum: MessageType,
    default: MessageType.TEXT,
  })
  type: MessageType;

  @Column({
    type: 'enum',
    enum: MessageStatus,
    default: MessageStatus.SENT,
  })
  status: MessageStatus;

  @Column({ nullable: true })
  roomId: string;

  @Column({ nullable: true })
  authorId: string;

  @Column({ nullable: true })
  taskId?: string; // For task comments

  @Column({ nullable: true })
  replyToId?: string; // For reply messages

  @Column({ nullable: true })
  fileUrl?: string; // For file/image messages

  @Column({ nullable: true })
  fileName?: string;

  @Column({ nullable: true })
  fileSize?: number;

  @Column({ nullable: true })
  mimeType?: string;

  @Column({ type: 'jsonb', nullable: true })
  mentions?: string[]; // Array of mentioned user IDs

  @Column({ type: 'jsonb', nullable: true })
  readBy?: string[]; // Array of user IDs who read the message

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>; // Additional message data

  @Column({ default: false })
  isEdited: boolean;

  @Column({ nullable: true })
  editedAt?: Date;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  deletedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne('ChatRoom', 'messages')
  @JoinColumn({ name: 'roomId' })
  room: ChatRoom;

  @ManyToOne('User', 'chatMessages')
  @JoinColumn({ name: 'authorId' })
  author: User;

  @ManyToOne('Task', 'comments')
  @JoinColumn({ name: 'taskId' })
  task?: Task;

  @ManyToOne('ChatMessage', 'replies')
  @JoinColumn({ name: 'replyToId' })
  replyTo?: ChatMessage;

  @OneToMany('ChatMessage', 'replyTo')
  replies: ChatMessage[];

  // Virtual properties
  get isFileMessage(): boolean {
    return this.type === MessageType.FILE || this.type === MessageType.IMAGE;
  }

  get isTaskComment(): boolean {
    return this.type === MessageType.TASK_COMMENT;
  }

  get isSystemMessage(): boolean {
    return this.type === MessageType.SYSTEM;
  }

  get hasMentions(): boolean {
    return !!(this.mentions && this.mentions.length > 0);
  }

  get readCount(): number {
    return this.readBy ? this.readBy.length : 0;
  }

  get isRead(): boolean {
    return this.status === MessageStatus.READ;
  }
}
