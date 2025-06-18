
import React from 'react';

const TasksHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">AVAILABLE TASKS</h1>
      <p className="text-gray-600">
        Find tasks that match your expertise and help others achieve their goals
      </p>
    </div>
  );
};

export default TasksHeader;
