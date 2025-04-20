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
  id: number;
  name: string;
  role: string;
  email: string;
  avatar: string;
};
type ScheduleEvent = {
  id: string;
  title: string;
  date: string;
  description: string;
  attendees: number[];
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
  updateProject: (project: { id: string; name: string; description: string }) => void;
  deleteProject: (id: string) => void;
  addTask: (projectId: string, task: Omit<Task, 'id' | 'completed'>) => void;
  addMessage: (projectId: string, content: string, author: string) => void;
  deleteMessage: (projectId: string, messageId: string) => void;
  setSearchQuery: (query: string) => void;
  searchProjects: (query: string) => Project[];
  addEvent: (event: Omit<ScheduleEvent, 'id'>) => void;
  updateEvent: (event: ScheduleEvent) => void;
  deleteEvent: (id: string) => void;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  deleteTeamMember: (id: number) => void;
  deleteTask: (projectId: string, taskId: string) => void;
};
// Mock data removed for database integration.
const mockProjects: Project[] = [];
// Mock team members removed for database integration.
const mockTeamMembers: TeamMember[] = [];
// Mock schedule events removed for database integration.
const mockScheduleEvents: ScheduleEvent[] = [];
// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);
// Provider component
export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // ...existing state and functions...

  // Delete task function
  const deleteTask = async (projectId: string, taskId: string) => {
    try {
      // Pastikan taskId dikirim sebagai number agar sesuai backend
      const numericId = Number(taskId);
      const res = await fetch(`http://localhost:3001/api/tasks/${numericId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete task');
      if (fetchAllRef.current) await fetchAllRef.current();
    } catch (err) {
      alert('Gagal menghapus task.');
      console.error(err);
    }
  };

  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  // Fetch data dari backend on mount
  const fetchAllRef = React.useRef<() => Promise<void>>();
  const fetchAll = async () => {
      setLoading(true);
      try {
        // Fetch projects
        const resProjects = await fetch('http://localhost:3001/api/projects');
        const projectsData = await resProjects.json();
        setProjects(projectsData.map((p: any) => ({
          ...p,
          tasks: Array.isArray(p.tasks) ? p.tasks : [],
          messages: Array.isArray(p.messages) ? p.messages : []
        })));
        // Hanya set activeProject ke project pertama jika belum ada yang aktif
        if (projectsData.length > 0 && (!activeProject || !projectsData.some((p: any) => p.id === activeProject))) {
          setActiveProject(projectsData[0].id);
        }
        // Fetch team members
        try {
          const resTeam = await fetch('http://localhost:3001/api/team');
          const teamData = await resTeam.json();
          setTeamMembers(Array.isArray(teamData) ? teamData : []);
        } catch (err) {
          setTeamMembers([]);
          console.error('Failed to fetch team members:', err);
        }
        // Fetch events
        const resEvents = await fetch('http://localhost:3001/api/events');
        const eventsData = await resEvents.json();
        setScheduleEvents(Array.isArray(eventsData) ? eventsData.map(ev => ({ ...ev, attendees: ev.attendees || [] })) : []);
      } catch (err) {
        console.error('Failed to fetch initial data:', err);
        setTeamMembers([]); // Patch: always fallback to array
      } finally {
        setLoading(false);
      }
  };
  fetchAllRef.current = fetchAll;
  React.useEffect(() => {
    fetchAll();
  }, []);

  const addProject = async (name: string, description: string) => {
    try {
      const res = await fetch('http://localhost:3001/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
      });
      if (!res.ok) throw new Error('Failed to add project');
      if (fetchAllRef.current) await fetchAllRef.current();
    } catch (err) {
      alert('Gagal menambah project.');
      console.error(err);
    }
  };

  const updateProject = async (project: { id: string; name: string; description: string }) => {
    try {
      const res = await fetch(`http://localhost:3001/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: project.name, description: project.description })
      });
      if (!res.ok) throw new Error('Failed to update project');
      if (fetchAllRef.current) await fetchAllRef.current();
    } catch (err) {
      alert('Gagal mengedit project.');
      console.error(err);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3001/api/projects/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok && res.status !== 204) throw new Error('Failed to delete project');
      if (fetchAllRef.current) await fetchAllRef.current();
    } catch (err) {
      alert('Gagal menghapus project.');
      console.error(err);
    }
  };

  const addTask = async (projectId: string, task: Omit<Task, 'id' | 'completed'>) => {
    try {
      const payload = {
        projectId: Number(projectId),
        title: task.title,
        dueDate: task.dueDate || null,
        assignee: task.assignee
      };
      console.log('[addTask] Sending payload:', payload);
      const res = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errMsg = await res.text();
        console.error('[addTask] Backend error:', errMsg);
        throw new Error('Failed to add task');
      }
      const newTask = await res.json();
      console.log('[addTask] Backend response:', newTask);
      // Setelah menambah task, fetch ulang semua data project dari backend
      if (fetchAllRef.current) await fetchAllRef.current();
    } catch (err) {
      alert('Gagal menambah task ke database.');
      console.error(err);
    }
  };
  const addMessage = async (projectId: string, content: string, author: string) => {
    try {
      const avatar = teamMembers.find(member => member.name === author)?.avatar || 'https://i.pravatar.cc/150';
      const res = await fetch('http://localhost:3001/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: Number(projectId),
          author,
          content,
          avatar
        })
      });
      if (!res.ok) {
        const errMsg = await res.text();
        console.error('Backend error:', errMsg);
        throw new Error('Failed to add message');
      }
      const newMessage = await res.json();
      setProjects(projects => projects.map(project => {
        if (project.id === projectId) {
          return { ...project, messages: [...project.messages, newMessage] };
        }
        return project;
      }));
    } catch (err) {
      alert('Gagal menambah pesan ke database.');
      console.error(err);
    }
  };

  const deleteMessage = async (projectId: string, messageId: string) => {
    try {
      const res = await fetch(`http://localhost:3001/api/messages/${messageId}`, {
        method: 'DELETE',
      });
      if (!res.ok && res.status !== 204) throw new Error('Failed to delete message');
      if (fetchAllRef.current) await fetchAllRef.current();
    } catch (err) {
      alert('Gagal menghapus pesan.');
      console.error(err);
    }
  };
  const searchProjects = (query: string) => {
    if (!query) return projects;
    const lowercaseQuery = query.toLowerCase();
    return projects.filter(project => project.name.toLowerCase().includes(lowercaseQuery) || project.description.toLowerCase().includes(lowercaseQuery));
  };
  const toggleTaskCompletion = async (projectId: string, taskId: string) => {
    // Cari status terbaru dari task
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    const task = project.tasks.find(t => t.id === taskId);
    if (!task) return;
    const newStatus = !task.completed;
    try {
      await fetch(`http://localhost:3001/api/tasks/${taskId}/toggle`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: newStatus })
      });
      if (fetchAllRef.current) await fetchAllRef.current();
    } catch (err) {
      alert('Gagal update status task.');
      console.error(err);
    }
  };

  const addEvent = async (event: { title: string; description: string; date: string; attendees?: number[] }) => {
    try {
      const res = await fetch('http://localhost:3001/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: event.title, description: event.description, date: event.date, attendees: event.attendees || [] })
      });
      if (!res.ok) throw new Error('Failed to add event');
      if (fetchAllRef.current) await fetchAllRef.current();
    } catch (err) {
      alert('Gagal menambah event.');
      console.error(err);
    }
  };

  const updateEvent = async (event: ScheduleEvent) => {
    try {
      const res = await fetch(`http://localhost:3001/api/events/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: event.title,
          description: event.description,
          date: event.date,
          attendees: event.attendees || []
        })
      });
      if (!res.ok) throw new Error('Failed to update event');
      if (fetchAllRef.current) await fetchAllRef.current();
    } catch (err) {
      alert('Gagal mengedit event.');
      console.error(err);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3001/api/events/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok && res.status !== 204) throw new Error('Failed to delete event');
      if (fetchAllRef.current) await fetchAllRef.current();
    } catch (err) {
      alert('Gagal menghapus event.');
      console.error(err);
    }
  };

  const addTeamMember = async (member: Omit<TeamMember, 'id'>) => {
    try {
      const res = await fetch('http://localhost:3001/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: member.name,
          role: member.role,
          email: member.email,
          avatar: member.avatar,
          job_desc: member.jobDesc || member.job_desc || ''
        })
      });
      if (!res.ok) throw new Error('Failed to add team member');
      const newMember = await res.json();
      setTeamMembers(prev => [...prev, newMember]);
    } catch (err) {
      alert('Gagal menambah anggota tim.');
      console.error(err);
    }
  };

  // Fungsi hapus anggota tim
  const deleteTeamMember = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/api/team/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok && res.status !== 204) throw new Error('Failed to delete team member');
      setTeamMembers(prev => prev.filter(member => member.id !== id));
    } catch (err) {
      alert('Gagal menghapus anggota tim.');
      console.error(err);
    }
  };



  return (
    <AppContext.Provider
      value={{
        projects,
        activeProject,
        searchQuery,
        teamMembers,
        scheduleEvents,
        setActiveProject,
        toggleTaskCompletion,
        addProject,
        updateProject,
        deleteProject,
        addTask,
        addMessage,
        setSearchQuery,
        searchProjects,
        addEvent,
        updateEvent,
        deleteEvent,
        addTeamMember,
        deleteTeamMember,
        deleteTask,
        deleteMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};