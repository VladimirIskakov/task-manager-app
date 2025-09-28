export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  order: number;
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
  filter: 'all' | 'active' | 'completed';
  searchQuery: string;
}

export type TaskFormValues = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
};

export interface CreateTaskData {
  title: string;
  description: string;
  priority: Priority;
  completed?: boolean;
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  updatedAt?: Date;
}
