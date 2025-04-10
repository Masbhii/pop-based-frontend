import React, { useState } from 'react';
import { Modal } from './Modal';
import { useApp } from '../../context/AppContext';
type NewTeamMemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export const NewTeamMemberModal: React.FC<NewTeamMemberModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    addTeamMember
  } = useApp();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [avatar, setAvatar] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && role.trim()) {
      addTeamMember({
        name: name.trim(),
        role: role.trim(),
        avatar: avatar.trim() || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
      });
      setName('');
      setRole('');
      setAvatar('');
      onClose();
    }
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Add Team Member">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter team member's name" required />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <input id="role" type="text" value={role} onChange={e => setRole(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter team member's role" required />
          </div>
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
              Avatar URL (optional)
            </label>
            <input id="avatar" type="url" value={avatar} onChange={e => setAvatar(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter avatar URL" />
          </div>
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Add Member
            </button>
          </div>
        </div>
      </form>
    </Modal>;
};