import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/ProjectCard';
import { TaskList } from '../components/TaskList';
import { MessageBoard } from '../components/MessageBoard';
import { SearchIcon, PlusCircleIcon } from 'lucide-react';
import { NewProjectModal } from '../components/modals/NewProjectModal';
import { NewTaskModal } from '../components/modals/NewTaskModal';
import { NewMessageModal } from '../components/modals/NewMessageModal';
export const Dashboard = () => {
  const {
    projects,
    activeProject,
    setActiveProject,
    searchQuery,
    setSearchQuery,
    searchProjects,
    deleteMessage
  } = useApp();
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<{ id: string; name: string; description: string } | null>(null);
  const { updateProject, deleteProject } = useApp();
  const currentProject = projects.length > 0 ? (projects.find(p => p.id === activeProject) || projects[0]) : null;
  const filteredProjects = searchQuery ? searchProjects(searchQuery) : projects;
  return <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Projects Dashboard</h1>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
            <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button onClick={() => setIsNewProjectModalOpen(true)} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <PlusCircleIcon size={18} className="mr-2" />
            <span>New Project</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            description={project.description}
            progress={typeof project.progress === 'number' && !isNaN(project.progress) ? project.progress : 0}
            onClick={() => setActiveProject(project.id)}
            isActive={project.id === activeProject}
            onEdit={proj => setEditProject(proj)}
            onDelete={id => deleteProject(id)}
          />)
        ) : (
          <div className="col-span-full text-center text-gray-400 py-8">No projects yet. Create your first project!</div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentProject ? (
          <>
            <TaskList projectId={currentProject.id} tasks={Array.isArray(currentProject.tasks) ? currentProject.tasks : []} onNewTask={() => setIsNewTaskModalOpen(true)} />
            <MessageBoard
              messages={currentProject.messages}
              onNewMessage={() => setIsNewMessageModalOpen(true)}
              onDeleteMessage={messageId => deleteMessage(currentProject.id, messageId)}
            />
          </>
        ) : (
          <div className="col-span-full text-center text-gray-400 py-8">Select or create a project to see tasks and messages.</div>
        )}
      </div>
      <NewProjectModal isOpen={isNewProjectModalOpen} onClose={() => setIsNewProjectModalOpen(false)} />
      <NewProjectModal
        isOpen={!!editProject}
        onClose={() => setEditProject(null)}
        initialProject={editProject ?? undefined}
        onSave={proj => {
          updateProject(proj);
          setEditProject(null);
        }}
      />
      {currentProject && (
        <>
          <NewTaskModal isOpen={isNewTaskModalOpen} onClose={() => setIsNewTaskModalOpen(false)} projectId={currentProject.id} />
          <NewMessageModal isOpen={isNewMessageModalOpen} onClose={() => setIsNewMessageModalOpen(false)} projectId={currentProject.id} />
        </>
      )}
    </div>;
};