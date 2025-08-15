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
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { ChatMessage } from './chat-message.entity';
import { User } from './user.entity';

export enum ChatRoomType {
  PROJECT = 'project',
  DIRECT = 'direct',
  GROUP = 'group',
}

@Entity('chat_rooms')
export class ChatRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: ChatRoomType,
    default: ChatRoomType.PROJECT,
  })
  type: ChatRoomType;

  @Column({ nullable: true })
  projectId?: string; // For project-specific rooms

  @Column({ nullable: true })
  avatar?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isPrivate: boolean;

  @Column({ default: false })
  isArchived: boolean;

  @Column({ type: 'jsonb', nullable: true })
  settings?: Record<string, any>; // Room-specific settings

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne('Project', 'chatRooms')
  @JoinColumn({ name: 'projectId' })
  project?: Project;

  @OneToMany('ChatMessage', 'room')
  messages: ChatMessage[];

  @ManyToMany('User')
  @JoinTable({
    name: 'chat_room_members',
    joinColumn: { name: 'roomId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  members: User[];

  // Virtual properties
  get isProjectRoom(): boolean {
    return this.type === ChatRoomType.PROJECT;
  }

  get isDirectMessage(): boolean {
    return this.type === ChatRoomType.DIRECT;
  }

  get isGroupChat(): boolean {
    return this.type === ChatRoomType.GROUP;
  }

  get memberCount(): number {
    return this.members ? this.members.length : 0;
  }
}
