import React from 'react';
import { useApp } from '../context/AppContext';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ClipboardListIcon, MessageSquareIcon, CalendarIcon, FolderIcon, UsersIcon, SettingsIcon } from 'lucide-react';
export const Sidebar = () => {
  const {
    projects,
    activeProject,
    setActiveProject
  } = useApp();
  const location = useLocation();
  return <div className="w-64 bg-white border-r border-gray-200 shadow-sm min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Cozy Projects</h1>
      </div>
      <div className="p-4">
        <Link to="/" className="flex items-center mb-6 text-gray-700 hover:text-blue-600">
          <HomeIcon size={18} className="mr-3" />
          <span>Home</span>
        </Link>
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Main Menu
          </h2>
          <div className="space-y-3">
            <div className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer">
              <ClipboardListIcon size={18} className="mr-3" />
              <span>My Tasks</span>
            </div>
            <div className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer">
              <MessageSquareIcon size={18} className="mr-3" />
              <span>Messages</span>
            </div>
            <Link to="/schedule" className={`flex items-center ${location.pathname === '/schedule' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              <CalendarIcon size={18} className="mr-3" />
              <span>Schedule</span>
            </Link>
            <Link to="/team" className={`flex items-center ${location.pathname === '/team' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              <UsersIcon size={18} className="mr-3" />
              <span>Team</span>
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Projects
          </h2>
          <div className="space-y-2">
            {projects.map(project => <div key={project.id} onClick={() => setActiveProject(project.id)} className={`flex items-center rounded-md px-2 py-1.5 cursor-pointer ${activeProject === project.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                <FolderIcon size={16} className="mr-2" />
                <span className="text-sm truncate">{project.name}</span>
              </div>)}
          </div>
        </div>
      </div>
      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer">
          <SettingsIcon size={18} className="mr-3" />
          <span>Settings</span>
        </div>
      </div>
    </div>;
};