
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import TasksHeader from '@/components/TasksHeader';
import TasksList from '@/components/TasksList';
import { useTasks } from '@/hooks/useTasks';

const Tasks = () => {
  const { user, loading } = useAuth();
  const { tasks, loading: tasksLoading } = useTasks();

  if (loading || tasksLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl font-bold">Loading tasks...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-6xl mx-auto p-8">
        <TasksHeader />
        <TasksList tasks={tasks} />
      </main>
    </div>
  );
};

export default Tasks;
