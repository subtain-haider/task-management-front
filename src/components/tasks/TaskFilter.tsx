"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

export default function TaskFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [dueDate, setDueDate] = useState<Date | null>(
    searchParams.get('due_date') ? new Date(searchParams.get('due_date') as string) : null
  );
  const [fromDate, setFromDate] = useState<Date | null>(
    searchParams.get('from_date') ? new Date(searchParams.get('from_date') as string) : null
  );
  const [toDate, setToDate] = useState<Date | null>(
    searchParams.get('to_date') ? new Date(searchParams.get('to_date') as string) : null
  );
  const [search, setSearch] = useState(searchParams.get('search') || '');
  
  const handleFilter = () => {
    const params = new URLSearchParams();
    
    if (status) {
      params.set('status', status);
    }
    
    if (dueDate) {
      params.set('due_date', format(dueDate, 'yyyy-MM-dd'));
    }
    
    if (fromDate) {
      params.set('from_date', format(fromDate, 'yyyy-MM-dd'));
    }
    
    if (toDate) {
      params.set('to_date', format(toDate, 'yyyy-MM-dd'));
    }
    
    if (search) {
      params.set('search', search);
    }
    
    const queryString = params.toString();
    router.push(`/dashboard${queryString ? `?${queryString}` : ''}`);
  };
  
  const clearFilters = () => {
    setStatus('');
    setDueDate(null);
    setFromDate(null);
    setToDate(null);
    setSearch('');
    router.push('/dashboard');
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-lg font-medium mb-4">Filter Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1">
            Due On Specific Date
          </label>
          <DatePicker
            id="due_date"
            selected={dueDate}
            onChange={setDueDate}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="from_date" className="block text-sm font-medium text-gray-700 mb-1">
            From Date
          </label>
          <DatePicker
            id="from_date"
            selected={fromDate}
            onChange={setFromDate}
            dateFormat="yyyy-MM-dd"
            placeholderText="Start date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="to_date" className="block text-sm font-medium text-gray-700 mb-1">
            To Date
          </label>
          <DatePicker
            id="to_date"
            selected={toDate}
            onChange={setToDate}
            dateFormat="yyyy-MM-dd"
            placeholderText="End date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Clear Filters
        </button>
        <button
          onClick={handleFilter}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}