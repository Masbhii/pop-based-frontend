import React from 'react';
import { CheckCircleIcon, CircleIcon } from 'lucide-react';
type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  assignee: string;
};
type TaskItemProps = {
  task: Task;
  onToggle: () => void;
};
export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle
}) => {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  return <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start">
        <button onClick={onToggle} className={`mt-0.5 mr-3 flex-shrink-0 ${task.completed ? 'text-green-500' : 'text-gray-400'}`}>
          {task.completed ? <CheckCircleIcon size={18} /> : <CircleIcon size={18} />}
        </button>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <span className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </span>
            <div className="flex items-center mt-1 sm:mt-0">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                Due {formatDate(task.dueDate)}
              </span>
              <span className="ml-2 text-xs text-gray-600">
                {task.assignee}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};