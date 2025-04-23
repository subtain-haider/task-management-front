"use client";

import { useTasks } from '@/hooks/useTasks';
import TaskForm, { TaskFormData } from '@/components/tasks/TaskForm';
import { format } from 'date-fns';

export default function CreateTaskPage() {
  const { createTask } = useTasks();
  
  const handleSubmit = async (data: TaskFormData) => {
    const formattedData = {
      ...data,
      due_date: format(data.due_date, 'yyyy-MM-dd'),
    };
    
    await createTask(formattedData);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
          <p className="text-sm text-gray-600">Fill out the form below to create a new task.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <TaskForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}