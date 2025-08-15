import { User } from './auth.interface';
import { Project } from './project.interface';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: User;
  reporter: User;
  project: Project;
  dueDate: Date;
  estimatedHours: number;
  actualHours: number;
  subtasks: Subtask[];
  attachments: TaskAttachment[];
  comments: TaskComment[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  TESTING = 'testing',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export interface Subtask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  assignee?: User;
  dueDate?: Date;
}

export interface TaskAttachment {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadedBy: User;
  uploadedAt: Date;
  url: string;
}

export interface TaskComment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  mentions: User[];
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  projectId: string;
  assigneeId: string;
  priority: TaskPriority;
  dueDate: Date;
  estimatedHours: number;
  tags: string[];
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: string;
  dueDate?: Date;
  estimatedHours?: number;
  tags?: string[];
}

export interface TaskFilterRequest {
  projectId?: string;
  assigneeId?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDateFrom?: Date;
  dueDateTo?: Date;
  tags?: string[];
  search?: string;
}
