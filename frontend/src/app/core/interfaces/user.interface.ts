import { User } from './auth.interface';

export interface UserProfile extends User {
  // Extended user profile properties
  preferences?: UserPreferences;
  notifications?: NotificationSettings;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface NotificationSettings {
  projectUpdates: boolean;
  taskAssignments: boolean;
  deadlineReminders: boolean;
  mentionNotifications: boolean;
}

export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  bio?: string;
  phone?: string;
  avatar?: string;
}

export interface UserSearchRequest {
  query: string;
  role?: string;
  status?: string;
  limit?: number;
  offset?: number;
}
