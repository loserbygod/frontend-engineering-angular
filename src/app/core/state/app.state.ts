export interface AppState {
  loading: boolean;
  user: User | null;
  error: string | null;
}

export interface User {
  id: string;
  name: string;
}
