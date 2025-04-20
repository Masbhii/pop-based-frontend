import React from 'react';
import { MoreHorizontalIcon } from 'lucide-react';
type ProjectCardProps = {
  id: string;
  name: string;
  description: string;
  progress: number;
  onClick: () => void;
  isActive: boolean;
  onEdit?: (project: { id: string; name: string; description: string }) => void;
  onDelete?: (id: string) => void;
};
import { useState, useRef } from 'react';

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  description,
  progress,
  onClick,
  isActive,
  onEdit,
  onDelete
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  React.useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);
  return <div onClick={onClick} className={`
        bg-white rounded-lg p-5 shadow-sm border border-gray-100
        transition-all duration-200 cursor-pointer
        ${isActive ? 'ring-2 ring-blue-400 shadow-md transform -translate-y-1' : 'hover:shadow-md'}
      `} style={{
    background: 'linear-gradient(to bottom, #ffffff, #f9f9f9)'
  }}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <div className="relative" ref={menuRef}>
          <button className="text-gray-400 hover:text-gray-600 focus:outline-none" onClick={e => { e.stopPropagation(); setMenuOpen(v => !v); }} aria-label="Project options" aria-haspopup="true" aria-expanded={menuOpen}>
            <MoreHorizontalIcon size={18} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-lg z-20">
              <button
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={e => { e.stopPropagation(); setMenuOpen(false); onEdit && onEdit({ id, name, description }); }}
              >
                Edit
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={e => { e.stopPropagation(); setMenuOpen(false); onDelete && onDelete(id); }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
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