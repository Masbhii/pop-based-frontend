import React, { useState } from 'react';
import { Modal } from './Modal';
import { useApp } from '../../context/AppContext';
type NewProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialProject?: { id: string; name: string; description: string };
  onSave?: (project: { id: string; name: string; description: string }) => void;
};
export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  initialProject,
  onSave
}) => {
  const {
    addProject
  } = useApp();
  const [name, setName] = useState(initialProject ? initialProject.name : '');
  const [description, setDescription] = useState(initialProject ? initialProject.description : '');
  React.useEffect(() => {
    if (initialProject) {
      setName(initialProject.name);
      setDescription(initialProject.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [initialProject, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && description.trim()) {
      if (onSave && initialProject) {
        onSave({ id: initialProject.id, name: name.trim(), description: description.trim() });
      } else {
        addProject(name.trim(), description.trim());
        setName('');
        setDescription('');
      }
      onClose();
    }
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter project name" required />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={3} placeholder="Enter project description" required />
          </div>
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
              {initialProject ? 'Save Project' : 'Create Project'}
            </button>
          </div>
        </div>
      </form>
    </Modal>;
};