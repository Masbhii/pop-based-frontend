import React from 'react';
import { Modal } from './Modal';
import { Mail, Briefcase, Trash2 } from 'lucide-react';

interface TeamMemberDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: {
    id: number;
    name: string;
    role: string;
    email: string;
    avatar: string;
    jobDesc?: string;
  };
  activeTaskCount: number;
  onKick: (id: number) => void;
}

export const TeamMemberDetailModal: React.FC<TeamMemberDetailModalProps> = ({
  isOpen,
  onClose,
  member,
  activeTaskCount,
  onKick
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={member.name}>
      <div className="flex flex-col items-center p-4 space-y-4">
        <img
          src={member.avatar?.startsWith('http') ? member.avatar : `http://localhost:3001${member.avatar}`}
          alt={member.name}
          className="w-24 h-24 rounded-full border-2 border-gray-200 mb-2"
        />
        <div className="text-center">
          <h3 className="font-semibold text-lg text-gray-800">{member.name}</h3>
          <p className="text-sm text-gray-600 mb-1">{member.role}</p>
          {member.jobDesc && (
            <p className="text-xs text-gray-500 italic mb-2">{member.jobDesc}</p>
          )}
        </div>
        <div className="w-full space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase size={16} className="mr-2" />
            <span>{activeTaskCount} active tasks</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Mail size={16} className="mr-2" />
            <span>{member.email}</span>
          </div>
        </div>
        <button
          onClick={() => onKick(member.id)}
          className="mt-6 w-full flex items-center justify-center px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
        >
          <Trash2 size={16} className="mr-2" /> Kick Member
        </button>
      </div>
    </Modal>
  );
};
