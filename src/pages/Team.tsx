import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TeamMemberCard } from '../components/team/TeamMemberCard';
import { PlusCircleIcon } from 'lucide-react';
import { NewTeamMemberModal } from '../components/modals/NewTeamMemberModal';
export const Team = () => {
  const {
    teamMembers,
    projects
  } = useApp();
  const [isNewTeamMemberModalOpen, setIsNewTeamMemberModalOpen] = useState(false);
  return <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Team Members</h1>
        <button onClick={() => setIsNewTeamMemberModalOpen(true)} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <PlusCircleIcon size={18} className="mr-2" />
          <span>Add Member</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.length > 0 ? (
          teamMembers.map(member => <TeamMemberCard key={member.id} member={member} projects={projects} />)
        ) : (
          <div className="col-span-full text-center text-gray-400 py-8">No team members yet. Add your first team member!</div>
        )}
      </div>
      <NewTeamMemberModal isOpen={isNewTeamMemberModalOpen} onClose={() => setIsNewTeamMemberModalOpen(false)} />
    </div>;
};