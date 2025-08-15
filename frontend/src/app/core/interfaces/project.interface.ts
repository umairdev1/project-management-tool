import { User } from './auth.interface';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate: Date;
  endDate: Date;
  progress: number;
  owner: User;
  members: ProjectMember[];
  tags: ProjectTag[];
  createdAt: Date;
  updatedAt: Date;
}

export enum ProjectStatus {
  PLANNING = 'planning',
  ACTIVE = 'active',
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

export interface ProjectMember {
  id: string;
  user: User;
  role: ProjectMemberRole;
  joinedAt: Date;
  permissions: ProjectPermission[];
}

export enum ProjectMemberRole {
  VIEWER = 'viewer',
  MEMBER = 'member',
  DEVELOPER = 'developer',
  LEAD = 'lead',
  MANAGER = 'manager',
}

export interface ProjectPermission {
  action: string;
  resource: string;
  granted: boolean;
}

export interface ProjectTag {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  priority: ProjectPriority;
  memberIds: string[];
  tags: string[];
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  status?: ProjectStatus;
  priority?: ProjectPriority;
  startDate?: Date;
  endDate?: Date;
}
