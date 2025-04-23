"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Task, TaskFormData } from '@/lib/types';
import { toast } from 'react-hot-toast';

export function useTasks(filters?: Record<string, any>) {
  const queryClient = useQueryClient();
  
  // Build query string from filters
  const queryString = filters 
    ? `?${Object.entries(filters)
        .filter(([_, value]) => value !== undefined && value !== '')
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join('&')}`
    : '';

  // Fetch tasks
  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks', filters],
    queryFn: async () => {
      const response = await api.get(`/tasks${queryString}`);
      return response.data;
    },
  });

  // Create task
  const createTask = useMutation({
    mutationFn: async (taskData: TaskFormData) => {
      const response = await api.post('/tasks', taskData);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Task created successfully!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create task');
    },
  });

  // Update task
  const updateTask = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<TaskFormData> }) => {
      const response = await api.put(`/tasks/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Task updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update task');
    },
  });

  // Delete task
  const deleteTask = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/tasks/${id}`);
      return id;
    },
    onSuccess: () => {
      toast.success('Task deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete task');
    },
  });

  // Get task by ID
  const getTask = async (id: number): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data.data;
  };

  return {
    tasks: data?.data || [],
    pagination: data?.meta,
    isLoading,
    error,
    createTask: createTask.mutate,
    updateTask: updateTask.mutate,
    deleteTask: deleteTask.mutate,
    getTask,
  };
}