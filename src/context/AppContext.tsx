import React, { useState, createContext, useContext } from 'react';
// Types for our data
type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  assignee: string;
};
type Message = {
  id: string;
  author: string;
  content: string;
  date: string;
  avatar: string;
};
type Project = {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  progress: number;
  messages: Message[];
};
type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatar: string;
};
type ScheduleEvent = {
  id: string;
  title: string;
  date: string;
  description: string;
  attendees: string[];
};
// Context type
type AppContextType = {
  projects: Project[];
  activeProject: string;
  searchQuery: string;
  teamMembers: TeamMember[];
  scheduleEvents: ScheduleEvent[];
  setActiveProject: (id: string) => void;
  toggleTaskCompletion: (projectId: string, taskId: string) => void;
  addProject: (name: string, description: string) => void;
  addTask: (projectId: string, task: Omit<Task, 'id' | 'completed'>) => void;
  addMessage: (projectId: string, content: string, author: string) => void;
  setSearchQuery: (query: string) => void;
  searchProjects: (query: string) => Project[];
  addEvent: (event: Omit<ScheduleEvent, 'id'>) => void;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
};
// Mock data
const mockProjects: Project[] = [{
  id: '1',
  name: 'Website Redesign',
  description: 'Overhaul the company website with new branding',
  progress: 65,
  tasks: [{
    id: 't1',
    title: 'Wireframe approval',
    completed: true,
    dueDate: '2023-10-15',
    assignee: 'Alex Kim'
  }, {
    id: 't2',
    title: 'Design homepage',
    completed: true,
    dueDate: '2023-10-22',
    assignee: 'Sarah Johnson'
  }, {
    id: 't3',
    title: 'Develop frontend components',
    completed: false,
    dueDate: '2023-11-05',
    assignee: 'Miguel Rodriguez'
  }, {
    id: 't4',
    title: 'Content migration',
    completed: false,
    dueDate: '2023-11-10',
    assignee: 'Priya Patel'
  }],
  messages: [{
    id: 'm1',
    author: 'Sarah Johnson',
    content: "I've uploaded the new homepage designs to the shared folder. Let me know what you think!",
    date: '2023-10-20',
    avatar: 'https://i.pravatar.cc/150?img=1'
  }, {
    id: 'm2',
    author: 'Miguel Rodriguez',
    content: "The designs look great! I'll start implementing them tomorrow.",
    date: '2023-10-21',
    avatar: 'https://i.pravatar.cc/150?img=2'
  }]
}, {
  id: '2',
  name: 'Q4 Marketing Campaign',
  description: 'Plan and execute holiday marketing initiative',
  progress: 30,
  tasks: [{
    id: 't5',
    title: 'Market research',
    completed: true,
    dueDate: '2023-10-10',
    assignee: 'James Wilson'
  }, {
    id: 't6',
    title: 'Campaign strategy document',
    completed: true,
    dueDate: '2023-10-17',
    assignee: 'Emma Davis'
  }, {
    id: 't7',
    title: 'Creative asset production',
    completed: false,
    dueDate: '2023-11-01',
    assignee: 'Olivia Martinez'
  }, {
    id: 't8',
    title: 'Media buying',
    completed: false,
    dueDate: '2023-11-15',
    assignee: 'Liam Thompson'
  }],
  messages: [{
    id: 'm3',
    author: 'Emma Davis',
    content: "The strategy document is ready for review. I've highlighted areas where we need additional budget approval.",
    date: '2023-10-17',
    avatar: 'https://i.pravatar.cc/150?img=3'
  }]
}, {
  id: '3',
  name: 'Product Launch',
  description: 'Prepare for the new feature launch in December',
  progress: 15,
  tasks: [{
    id: 't9',
    title: 'Finalize feature set',
    completed: true,
    dueDate: '2023-10-05',
    assignee: 'Noah Chen'
  }, {
    id: 't10',
    title: 'Beta testing plan',
    completed: false,
    dueDate: '2023-10-25',
    assignee: 'Sophia Lee'
  }, {
    id: 't11',
    title: 'Press release draft',
    completed: false,
    dueDate: '2023-11-10',
    assignee: 'Ethan Wright'
  }, {
    id: 't12',
    title: 'Launch event coordination',
    completed: false,
    dueDate: '2023-11-25',
    assignee: 'Ava Garcia'
  }],
  messages: [{
    id: 'm4',
    author: 'Noah Chen',
    content: 'Engineering has confirmed all planned features will be ready for the December release.',
    date: '2023-10-08',
    avatar: 'https://i.pravatar.cc/150?img=4'
  }, {
    id: 'm5',
    author: 'Sophia Lee',
    content: "I'm working on the beta testing plan. We'll need about 50 participants - should I reach out to our usual testers?",
    date: '2023-10-22',
    avatar: 'https://i.pravatar.cc/150?img=5'
  }]
}];
// Mock team members
const mockTeamMembers: TeamMember[] = [{
  id: '1',
  name: 'Alex Kim',
  role: 'Product Designer',
  avatar: 'https://i.pravatar.cc/150?img=1'
}, {
  id: '2',
  name: 'Sarah Johnson',
  role: 'Frontend Developer',
  avatar: 'https://i.pravatar.cc/150?img=2'
}, {
  id: '3',
  name: 'Miguel Rodriguez',
  role: 'Backend Developer',
  avatar: 'https://i.pravatar.cc/150?img=3'
}];
// Mock schedule events
const mockScheduleEvents: ScheduleEvent[] = [{
  id: '1',
  title: 'Weekly Team Sync',
  date: '2023-11-01T10:00:00',
  description: 'Regular team sync meeting',
  attendees: ['1', '2', '3']
}, {
  id: '2',
  title: 'Project Review',
  date: '2023-11-02T14:00:00',
  description: 'Review website redesign progress',
  attendees: ['1', '2']
}];
// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);
// Provider component
export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [activeProject, setActiveProject] = useState<string>(mockProjects[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>(mockScheduleEvents);
  const addProject = (name: string, description: string) => {
    const newProject: Project = {
      id: `p${projects.length + 1}`,
      name,
      description,
      progress: 0,
      tasks: [],
      messages: []
    };
    setProjects([...projects, newProject]);
  };
  const addTask = (projectId: string, task: Omit<Task, 'id' | 'completed'>) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const newTask: Task = {
          ...task,
          id: `t${project.tasks.length + 1}`,
          completed: false
        };
        return {
          ...project,
          tasks: [...project.tasks, newTask]
        };
      }
      return project;
    }));
  };
  const addMessage = (projectId: string, content: string, author: string) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const newMessage: Message = {
          id: `m${project.messages.length + 1}`,
          author,
          content,
          date: new Date().toISOString(),
          avatar: teamMembers.find(member => member.name === author)?.avatar || 'https://i.pravatar.cc/150'
        };
        return {
          ...project,
          messages: [...project.messages, newMessage]
        };
      }
      return project;
    }));
  };
  const searchProjects = (query: string) => {
    if (!query) return projects;
    const lowercaseQuery = query.toLowerCase();
    return projects.filter(project => project.name.toLowerCase().includes(lowercaseQuery) || project.description.toLowerCase().includes(lowercaseQuery));
  };
  const toggleTaskCompletion = (projectId: string, taskId: string) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const updatedTasks = project.tasks.map(task => {
          if (task.id === taskId) {
            return {
              ...task,
              completed: !task.completed
            };
          }
          return task;
        });
        const completedTasks = updatedTasks.filter(task => task.completed).length;
        const progress = Math.round(completedTasks / updatedTasks.length * 100);
        return {
          ...project,
          tasks: updatedTasks,
          progress
        };
      }
      return project;
    }));
  };
  const addEvent = (event: Omit<ScheduleEvent, 'id'>) => {
    const newEvent: ScheduleEvent = {
      ...event,
      id: `e${scheduleEvents.length + 1}`
    };
    setScheduleEvents([...scheduleEvents, newEvent]);
  };
  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...member,
      id: `tm${teamMembers.length + 1}`
    };
    setTeamMembers([...teamMembers, newMember]);
  };
  return <AppContext.Provider value={{
    projects,
    activeProject,
    searchQuery,
    teamMembers,
    scheduleEvents,
    setActiveProject,
    toggleTaskCompletion,
    addProject,
    addTask,
    addMessage,
    setSearchQuery,
    searchProjects,
    addEvent,
    addTeamMember
  }}>
      {children}
    </AppContext.Provider>;
};
// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};