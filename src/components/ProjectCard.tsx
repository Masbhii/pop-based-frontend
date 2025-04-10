import React from 'react';
import { MoreHorizontalIcon } from 'lucide-react';
type ProjectCardProps = {
  id: string;
  name: string;
  description: string;
  progress: number;
  onClick: () => void;
  isActive: boolean;
};
export const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  description,
  progress,
  onClick,
  isActive
}) => {
  return <div onClick={onClick} className={`
        bg-white rounded-lg p-5 shadow-sm border border-gray-100
        transition-all duration-200 cursor-pointer
        ${isActive ? 'ring-2 ring-blue-400 shadow-md transform -translate-y-1' : 'hover:shadow-md'}
      `} style={{
    background: 'linear-gradient(to bottom, #ffffff, #f9f9f9)'
  }}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontalIcon size={18} />
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-800">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
          <div className="bg-blue-500 h-full rounded-full" style={{
          width: `${progress}%`
        }}></div>
        </div>
      </div>
    </div>;
};