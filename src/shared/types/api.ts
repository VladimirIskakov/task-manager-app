export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export type ApiResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};