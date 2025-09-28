export interface AppUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
}

export interface AuthState {
  user: AppUser | null;
  loading: boolean;
  error: string | null;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  displayName?: string;
}