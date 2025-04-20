import React from 'react';
import { TaskItem } from './TaskItem';
import { PlusIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  assignee: string;
};
type TaskListProps = {
  projectId: string;
  tasks: Task[];
  onNewTask: () => void;
};
export const TaskList: React.FC<TaskListProps> = ({
  projectId,
  tasks,
  onNewTask
}) => {
  const {
    toggleTaskCompletion,
    deleteTask
  } = useApp();
  return <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Tasks</h3>
        <button onClick={onNewTask} className="flex items-center text-sm text-blue-600 hover:text-blue-700">
          <PlusIcon size={16} className="mr-1" />
          <span>Add Task</span>
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {tasks.length > 0 ? tasks.map(task => (
  <TaskItem
    key={task.id}
    task={task}
    onToggle={() => toggleTaskCompletion(projectId, task.id)}
    onDelete={() => deleteTask(projectId, task.id)}
  />
)) : <div className="p-4 text-center text-gray-500">No tasks yet</div>}
      </div>
    </div>;
};