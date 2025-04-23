"use client";

import { useSearchParams } from 'next/navigation';
import { useTasks } from '@/hooks/useTasks';
import TaskItem from './TaskItem';
import LoadingSpinner from '../ui/LoadingSpinner';
import Link from 'next/link';

export default function TaskList() {
  const searchParams = useSearchParams();
  
  // Get all filter parameters
  const status = searchParams.get('status') || undefined;
  const dueDate = searchParams.get('due_date') || undefined;
  const fromDate = searchParams.get('from_date') || undefined;
  const toDate = searchParams.get('to_date') || undefined;
  const search = searchParams.get('search') || undefined;
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('per_page') || '10';
  
  const { tasks, pagination, isLoading, deleteTask } = useTasks({
    status,
    due_date: dueDate,
    from_date: fromDate,
    to_date: toDate,
    search,
    page,
    per_page: perPage
  });
  
  // Helper function to generate pagination URLs while preserving filters
  const getPaginationUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `/dashboard?${params.toString()}`;
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-500 mb-4">
          {searchParams.toString() 
            ? "No tasks match your filter criteria. Try adjusting your filters."
            : "Start by creating a new task to organize your work."}
        </p>
        {searchParams.toString() ? (
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 mr-2"
          >
            Clear Filters
          </Link>
        ) : null}
        <Link
          href="/dashboard/create"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Create New Task
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid gap-4 mb-6">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={() => deleteTask(task.id)} />
        ))}
      </div>
      
      {pagination && pagination.last_page > 1 && (
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-gray-700 mb-2 sm:mb-0">
              Showing <span className="font-medium">{pagination.from}</span> to{' '}
              <span className="font-medium">{pagination.to}</span> of{' '}
              <span className="font-medium">{pagination.total}</span> tasks
            </div>
            
            <div className="flex flex-wrap justify-center gap-1">
              {/* First page */}
              {pagination.current_page > 1 && (
                <Link
                  href={getPaginationUrl(1)}
                  className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  First
                </Link>
              )}
              
              {/* Previous page */}
              {pagination.current_page > 1 && (
                <Link
                  href={getPaginationUrl(pagination.current_page - 1)}
                  className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Previous
                </Link>
              )}
              
              {/* Page numbers */}
              <div className="flex space-x-1">
                {[...Array(pagination.last_page)].map((_, i) => {
                  const pageNumber = i + 1;
                  // Only show 5 page numbers centered around current page
                  if (
                    pageNumber === 1 ||
                    pageNumber === pagination.last_page ||
                    (pageNumber >= pagination.current_page - 1 && 
                     pageNumber <= pagination.current_page + 1)
                  ) {
                    return (
                      <Link
                        key={pageNumber}
                        href={getPaginationUrl(pageNumber)}
                        className={`px-3 py-1 rounded ${
                          pageNumber === pagination.current_page
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </Link>
                    );
                  }
                  
                  // Show ellipsis for gaps
                  if (
                    (pageNumber === 2 && pagination.current_page > 3) ||
                    (pageNumber === pagination.last_page - 1 && 
                     pagination.current_page < pagination.last_page - 2)
                  ) {
                    return <span key={pageNumber} className="px-2 py-1">...</span>;
                  }
                  
                  return null;
                })}
              </div>
              
              {/* Next page */}
              {pagination.current_page < pagination.last_page && (
                <Link
                  href={getPaginationUrl(pagination.current_page + 1)}
                  className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Next
                </Link>
              )}
              
              {/* Last page */}
              {pagination.current_page < pagination.last_page && (
                <Link
                  href={getPaginationUrl(pagination.last_page)}
                  className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Last
                </Link>
              )}
            </div>
          </div>
          
          {/* Per page selector */}
          <div className="mt-4 flex justify-end">
            <div className="flex items-center space-x-2">
              <label htmlFor="per_page" className="text-sm text-gray-600">
                Items per page:
              </label>
              <select
                id="per_page"
                value={perPage}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams);
                  params.set('per_page', e.target.value);
                  params.set('page', '1'); // Reset to first page when changing items per page
                  router.push(`/dashboard?${params.toString()}`);
                }}
                className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}