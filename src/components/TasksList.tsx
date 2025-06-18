
import React from 'react';
import { Calendar } from 'lucide-react';
import TaskCard from './TaskCard';

interface Task {
  id: string;
  title: string;
  description: string;
  budget_min: number;
  budget_max: number;
  duration_estimate: string;
  expertise_needed: string[];
  deadline: string;
  created_at: string;
  user_id: string;
  profiles: {
    full_name: string;
    email: string;
  } | null;
}

interface TasksListProps {
  tasks: Task[];
}

const TasksList: React.FC<TasksListProps> = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">No tasks available</h3>
        <p className="text-gray-600">Check back later for new opportunities!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TasksList;
