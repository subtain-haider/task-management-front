# Task Management Frontend

A modern, responsive Single Page Application built with **Next.js** and **TypeScript** for managing personal tasks. This frontend connects to a Laravel backend API for comprehensive task management capabilities.

## Technical Architecture

### Core Technologies

- ⚙️ **Next.js 13+**: Utilizes the App Router for improved page routing and server-side rendering  
- 📘 **TypeScript**: Static typing for enhanced code quality and developer experience  
- 🎨 **Tailwind CSS**: Utility-first CSS framework for responsive UI design  
- 🔁 **React Query**: Data fetching, caching, and state management  
- 🧾 **Zod + React Hook Form**: Schema-based form validation with TypeScript integration  
- 🌐 **Axios**: HTTP client configured with interceptors for token management  

## Authentication Implementation

Authentication uses **Laravel Sanctum** with:

- 🔄 Context-based auth state management  
- 🧠 Token storage in `localStorage` with security considerations  
- 📦 Axios interceptors for automatic token inclusion  
- 🔒 Protected route middleware  
- ✅ Automatic token verification and refresh  

## Data Management

Powered by **React Query**:

- ⚡ Automatic caching and background updates  
- 🔁 Optimistic UI updates for faster interaction  
- 🔂 Request deduplication  
- 🎯 Controlled refetching on window focus  

## Component Design Pattern

Component architecture includes:

- 🧩 **Presentation Components** – Pure UI with no logic  
- 📦 **Container Components** – Handle state and data fetching  
- 🧠 **Higher-order Components** – For cross-cutting concerns  
- 🔄 **Custom Hooks** – Shared reusable logic  

## State Management Strategy

State is managed using multiple approaches:

- 🌍 **Global State** – React Context API (e.g., authentication)  
- 📡 **Server State** – React Query for remote data  
- 🧮 **Form State** – React Hook Form for input control  
- 🧠 **Local State** – `useState` for UI-specific logic  

## Key Features

### Advanced Filtering System

Supports dynamic filters with URL sync:

- 📌 Status filtering: Pending, In-Progress, Completed  
- 📅 Date filtering: Specific date or date ranges  
- 🔍 Search: Title and description matching  
- 🔗 Filters persist via URL parameters  

### Responsive Pagination

Pagination features include:

- 📑 Server-side pagination with page size options  
- 🔁 Filter context preservation across pages  
- ➕ Dynamic page number rendering with ellipses  
- 🌀 Page reset when filters change  

### Form Validation Architecture

Uses Zod + React Hook Form:

- 🔐 Runtime validation with schemas  
- 🔍 TypeScript inference from schemas  
- 💬 Real-time feedback and error messages  
- ♻️ Reusable validation logic  

## Performance Optimizations

Optimizations include:

- 🔀 Code splitting via Next.js  
- ⚡ Optimistic UI updates  
- ♻️ Memoization using `useMemo` and `useCallback`  
- 🗃️ Intelligent caching with React Query  
- 💤 Lazy loading of components and routes  

## Security Considerations

Security best practices implemented:

- 🔒 XSS protection via React's safeguards  
- 🔐 Secure auth with proper token storage  
- 🛡️ CSRF protection via Laravel Sanctum  
- ✅ Client-side and server-side authorization checks  
- 🧾 Strict input validation before form submission  

## Getting Started Without Docker

To get started with this project:

```bash
git clone git@github.com:subtain-haider/task-management-front.git
cd task-management-front
npm install
npm run dev
```

Make sure to configure the `.env.local` file with the correct API endpoint and environment variables.

### Quick Start With Docker

Make sure Docker is running, then:
```bash
git clone git@github.com:subtain-haider/task-management-front.git
cd task-management-front
docker build -t task-management-front .
docker run -p 3000:3000 task-management-front
```