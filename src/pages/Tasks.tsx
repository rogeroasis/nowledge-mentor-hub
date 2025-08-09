
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

import Header from '@/components/Header';
import TasksHeader from '@/components/TasksHeader';
import TasksList from '@/components/TasksList';
import { useTasks } from '@/hooks/useTasks';

const Tasks = () => {
  const { user, loading } = useAuth();
  const { tasks, loading: tasksLoading } = useTasks();

  if (loading || tasksLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-2xl font-bold">Loading tasks...</div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-6xl mx-auto p-8">
        <TasksHeader />
        <TasksList tasks={tasks} />
      </main>
    </div>
  );
};

export default Tasks;
