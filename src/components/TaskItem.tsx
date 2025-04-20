import React, { useRef, useState } from 'react';
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

export const TaskItem: React.FC<TaskItemProps & { onDelete: () => void }> = ({
  task,
  onToggle,
  onDelete
}) => {
  // Format date to be more readable
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Swipe logic
  const [offsetX, setOffsetX] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const startX = useRef<number | null>(null);
  const threshold = 50; // px, lebih mudah di-swipe
  const maxSwipe = -80;
  const bounceSwipe = -90;

  // Membuat transisi lebih smooth
  const transitionStyle = swiping
    ? 'none'
    : 'transform 0.32s cubic-bezier(.33,1.4,.44,1)';

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setSwiping(true);
    startX.current = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!swiping || startX.current === null) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    let delta = clientX - startX.current;
    // Batasi offsetX agar tidak lebih dari bounceSwipe (untuk efek bounce)
    if (delta < 0) setOffsetX(Math.max(delta, bounceSwipe));
    else setOffsetX(0);
  };

  const handleTouchEnd = () => {
    setSwiping(false);
    if (offsetX < -threshold) {
      // Efek bounce jika overshoot
      setOffsetX(bounceSwipe);
      setTimeout(() => {
        setOffsetX(maxSwipe);
        setShowDelete(true);
      }, 80);
    } else {
      setOffsetX(0);
      setShowDelete(false);
    }
    startX.current = null;
  };

  const handleRestore = () => {
    setOffsetX(0);
    setShowDelete(false);
  };

  return (
    <div
      className="relative overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={swiping ? handleTouchMove : undefined}
      onMouseUp={handleTouchEnd}
      onMouseLeave={swiping ? handleTouchEnd : undefined}
      style={{ userSelect: swiping ? 'none' : undefined }}
    >
      <div
        className="absolute right-0 top-0 h-full flex items-center transition-all duration-200"
        style={{ width: 80, zIndex: 10, right: showDelete ? 0 : -80 }}
      >
        <button
          className="w-20 h-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
      <div
        className={`p-4 hover:bg-gray-50 transition-colors bg-white flex items-start`}
        style={{
          transform: `translateX(${offsetX}px)`,
          transition: transitionStyle,
          touchAction: 'pan-y',
        }}
        onClick={showDelete ? handleRestore : undefined}
      >
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
    </div>
  );
};