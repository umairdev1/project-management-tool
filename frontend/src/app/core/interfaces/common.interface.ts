export interface PaginationRequest {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface SearchRequest {
  query: string;
  filters?: Record<string, any>;
  pagination?: PaginationRequest;
}

export interface FilterOption {
  label: string;
  value: string | number | boolean;
  count?: number;
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  group?: string;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}
