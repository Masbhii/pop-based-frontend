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
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState<File|null>(null);
  const [jobDesc, setJobDesc] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let avatarUrl = avatar;
    if (avatarFile) {
      // Upload avatar ke backend
      const formData = new FormData();
      formData.append('file', avatarFile);
      const res = await fetch('http://localhost:3001/api/upload-avatar', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        avatarUrl = data.url;
      }
    }
    if (name.trim() && role.trim() && email.trim()) {
      addTeamMember({
        name: name.trim(),
        role: role.trim(),
        email: email.trim(),
        avatar: avatarUrl || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        jobDesc: jobDesc.trim()
      });
      setName('');
      setRole('');
      setEmail('');
      setAvatar('');
      setAvatarFile(null);
      setJobDesc('');
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
            <select
              id="role"
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="" disabled>Select role</option>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter team member's email" required />
          </div>
          <div>
            <label htmlFor="jobDesc" className="block text-sm font-medium text-gray-700 mb-1">
              Job Desc
            </label>
            <input id="jobDesc" type="text" value={jobDesc} onChange={e => setJobDesc(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter job description (e.g. developer)" required />
          </div>
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
              Avatar (URL or upload)
            </label>
            <input id="avatar" type="url" value={avatar} onChange={e => setAvatar(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2" placeholder="Enter avatar URL (optional)" />
            <div className="flex items-center space-x-2">
              <label htmlFor="avatarFile" className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md cursor-pointer hover:bg-blue-700 transition-colors">
                Pilih Foto
              </label>
              <span className="text-sm text-gray-600 truncate max-w-xs">{avatarFile ? avatarFile.name : 'Belum ada file dipilih'}</span>
              <input id="avatarFile" type="file" accept="image/*" onChange={e => setAvatarFile(e.target.files?.[0] || null)} className="hidden" />
            </div>
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