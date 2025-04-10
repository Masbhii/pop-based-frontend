import React from 'react';
import { Mail, Phone, Briefcase } from 'lucide-react';
type Project = {
  id: string;
  name: string;
  tasks: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
};
type TeamMemberCardProps = {
  member: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  };
  projects: Project[];
};
export const TeamMemberCard = ({
  member,
  projects
}: TeamMemberCardProps) => {
  const assignedTasks = projects.reduce((acc, project) => acc + project.tasks.filter(task => !task.completed).length, 0);
  return <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full border-2 border-gray-200" />
          <div>
            <h3 className="font-medium text-gray-800">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.role}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Briefcase size={16} className="mr-2" />
              <span>{assignedTasks} active tasks</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Mail size={16} className="mr-2" />
              <span>
                {member.name.toLowerCase().replace(' ', '.')}@company.com
              </span>
            </div>
          </div>
        </div>
        {projects.length > 0 && <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Current Projects
            </h4>
            <div className="space-y-1">
              {projects.map(project => <div key={project.id} className="text-sm text-gray-600">
                  • {project.name}
                </div>)}
            </div>
          </div>}
      </div>
    </div>;
};