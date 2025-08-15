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
import { User } from './user.entity';

export enum ProjectMemberRole {
  OWNER = 'owner',
  MANAGER = 'manager',
  MEMBER = 'member',
  VIEWER = 'viewer',
}

@Entity('project_members')
export class ProjectMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  projectId: string;

  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: ProjectMemberRole,
    default: ProjectMemberRole.MEMBER,
  })
  role: ProjectMemberRole;

  @Column({ type: 'date', nullable: true })
  joinedAt?: Date;

  @Column({ type: 'date', nullable: true })
  leftAt?: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne('Project', 'members')
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @ManyToOne('User', 'projectMemberships')
  @JoinColumn({ name: 'userId' })
  user: User;

  // Virtual properties
  get isOwner(): boolean {
    return this.role === ProjectMemberRole.OWNER;
  }

  get isManager(): boolean {
    return (
      this.role === ProjectMemberRole.MANAGER ||
      this.role === ProjectMemberRole.OWNER
    );
  }

  get canEdit(): boolean {
    return (
      this.role === ProjectMemberRole.OWNER ||
      this.role === ProjectMemberRole.MANAGER
    );
  }

  get canDelete(): boolean {
    return this.role === ProjectMemberRole.OWNER;
  }
}
