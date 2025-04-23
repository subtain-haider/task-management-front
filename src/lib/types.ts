export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Task {
    id: number;
    title: string;
    description: string | null;
    due_date: string;
    status: 'pending' | 'in-progress' | 'completed';
    created_at: string;
    updated_at: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface TaskFormData {
    title: string;
    description: string;
    due_date: string;
    status: 'pending' | 'in-progress' | 'completed';
}