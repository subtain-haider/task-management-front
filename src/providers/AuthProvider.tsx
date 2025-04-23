"use client";

import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { AuthState, LoginCredentials, RegisterCredentials, User } from '@/lib/types';
import { toast } from 'react-hot-toast';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

const defaultState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

export const AuthContext = createContext<AuthContextType>({
  ...defaultState,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>(defaultState);
  const router = useRouter();

  useEffect(() => {
    // Check for token and user in localStorage
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');
    
    if (token && userJson) {
      const user = JSON.parse(userJson);
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Verify the token is still valid
  useEffect(() => {
    const validateToken = async () => {
      if (state.token && !state.isLoading) {
        try {
          const response = await api.get('/user');
          setState(prev => ({
            ...prev,
            user: response.data.user,
            isAuthenticated: true,
          }));
        } catch (error) {
          // Token is invalid
          logout();
        }
      }
    };
    
    validateToken();
  }, [state.token, state.isLoading]);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await api.post('/login', credentials);
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
      
      toast.success('Logged in successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to login';
      toast.error(message);
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      await api.post('/register', credentials);
      toast.success('Registered successfully! Please login.');
      router.push('/login');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to register';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    if (state.token) {
      api.post('/logout').catch(() => {
        // Silent catch
      });
    }
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
    
    toast.success('Logged out successfully!');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};