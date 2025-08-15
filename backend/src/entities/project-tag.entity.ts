import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Project } from './project.entity';

@Entity('project_tags')
export class ProjectTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  color?: string; // Hex color code

  @Column({ nullable: true })
  icon?: string; // Icon class or name

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  usageCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToMany('Project', 'tags')
  @JoinTable({
    name: 'project_project_tags',
    joinColumn: { name: 'tagId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'projectId', referencedColumnName: 'id' },
  })
  projects: Project[];
}
