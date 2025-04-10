import React, { useState } from 'react';
import { Modal } from './Modal';
import { useApp } from '../../context/AppContext';
type NewMessageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
};
export const NewMessageModal: React.FC<NewMessageModalProps> = ({
  isOpen,
  onClose,
  projectId
}) => {
  const {
    addMessage,
    teamMembers
  } = useApp();
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && author) {
      addMessage(projectId, content.trim(), author);
      setContent('');
      setAuthor('');
      onClose();
    }
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="New Message">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <select id="author" value={author} onChange={e => setAuthor(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
              <option value="">Select team member</option>
              {teamMembers.map(member => <option key={member.id} value={member.name}>
                  {member.name}
                </option>)}
            </select>
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea id="content" value={content} onChange={e => setContent(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={4} placeholder="Type your message here..." required />
          </div>
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Send Message
            </button>
          </div>
        </div>
      </form>
    </Modal>;
};