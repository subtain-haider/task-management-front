"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTasks } from '@/hooks/useTasks';
import TaskForm, { TaskFormData } from '@/components/tasks/TaskForm';
import { format } from 'date-fns';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function EditTaskPage() {
  const params = useParams();
  const taskId = Number(params.id);
  const { updateTask, getTask } = useTasks();
  
  const [task, setTask] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await getTask(taskId);
        setTask(taskData);
      } catch (error) {
        setError('Failed to load task. Please try again.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTask();
  }, [taskId, getTask]);
  
  const handleSubmit = async (data: TaskFormData) => {
    const formattedData = {
      ...data,
      due_date: format(data.due_date, 'yyyy-MM-dd'),
    };
    
    await updateTask({ id: taskId, data: formattedData });
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }
  
  if (error || !task) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-red-600 mb-4">{error || 'Task not found'}</p>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Edit Task</h1>
          <p className="text-sm text-gray-600">Update the task details below.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <TaskForm 
            initialData={task} 
            onSubmit={handleSubmit} 
            isEditing={true} 
          />
        </div>
      </div>
    </div>
  );
}