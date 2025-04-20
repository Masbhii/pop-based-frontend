import React from 'react';
import { Mail, Phone, Briefcase } from 'lucide-react';
type Project = {
  id: string;
  name: string;
  tasks: Array<{
    id: string;
    title: string;
    completed: boolean;
    assignee?: string;
  }>;
};
type TeamMemberCardProps = {
  member: {
    id: string | number;
    name: string;
    role: string;
    avatar: string;
  };
  projects: Project[];
};
import { TeamMemberDetailModal } from '../modals/TeamMemberDetailModal';
import { useApp } from '../../context/AppContext';

export const TeamMemberCard = ({
  member,
  projects
}: TeamMemberCardProps) => {
  const [showDetail, setShowDetail] = React.useState(false);
  // Hitung jumlah active tasks berdasarkan assignee yang sesuai dengan member.name
  const assignedTasks = projects.reduce((acc, project) =>
    acc + project.tasks.filter(task => !task.completed && task.assignee === member.name).length, 0
  );
  const { deleteTeamMember } = useApp();

  // Dummy jobDesc, bisa diambil dari member.jobDesc jika ada di DB
  const jobDesc = (member as any).jobDesc || '';

  // Fungsi kick member, terhubung ke backend
  const handleKick = (id: number) => {
    deleteTeamMember(id);
    setShowDetail(false);
  };

  return <>
    <div
      className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setShowDetail(true)}
    >
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <img src={member.avatar?.startsWith('http') ? member.avatar : `http://localhost:3001${member.avatar}`} alt={member.name} className="w-16 h-16 rounded-full border-2 border-gray-200" />
          <div>
            <h3 className="font-medium text-gray-800">
              {member.name}
              {((member as any).jobDesc || (member as any).job_desc) && (
                <span className="text-gray-500 font-normal"> / {(member as any).jobDesc || (member as any).job_desc}</span>
              )}
            </h3>
            <p className="text-sm text-gray-600">{member.role}</p>
          </div>
        </div>
      </div>
    </div>
    <TeamMemberDetailModal
      isOpen={showDetail}
      onClose={() => setShowDetail(false)}
      member={{ id: Number(member.id), name: member.name, role: member.role, email: (member as any).email, avatar: member.avatar, jobDesc }}
      activeTaskCount={assignedTasks}
      onKick={handleKick}
    />
  </>;
};