"use client";

import { Task } from '@/lib/types';
import Link from 'next/link';
import { format } from 'date-fns';
import { useState } from 'react';

interface TaskItemProps {
  task: Task;
  onDelete: () => void;
}

export default function TaskItem({ task, onDelete }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
  };
  
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      await onDelete();
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status as keyof typeof statusColors]}`}>
          {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>
      
      <p className="mt-2 text-gray-600 line-clamp-2">{task.description || 'No description provided.'}</p>
      
      <div className="mt-4 flex items-center text-sm text-gray-500">
        <span className="mr-4">
          Due: {format(new Date(task.due_date), 'MMM d, yyyy')}
        </span>
      </div>
      
      <div className="mt-4 flex justify-end space-x-2">
        <Link
          href={`/dashboard/edit/${task.id}`}
          className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 disabled:opacity-50"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}