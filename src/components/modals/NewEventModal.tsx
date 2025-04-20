import React, { useState, useMemo } from 'react';
import { Modal } from './Modal';
import { useApp } from '../../context/AppContext';

type NewEventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialEvent?: {
    id: string;
    title: string;
    description: string;
    date: string;
    attendees: number[];
  };
  teamMembers?: { id: number; name: string; avatar: string }[];
  onSave?: (event: any) => void;
};

type TeamMember = {
  id: number;
  name: string;
  avatar: string;
};

export const NewEventModal: React.FC<NewEventModalProps> = ({
  isOpen,
  onClose,
  initialEvent,
  teamMembers: propTeamMembers,
  onSave
}) => {
  const { teamMembers: contextTeamMembers, addEvent } = useApp();
  const teamMembers = propTeamMembers || contextTeamMembers;
  const [title, setTitle] = useState(initialEvent ? initialEvent.title : '');
  const [description, setDescription] = useState(initialEvent ? initialEvent.description : '');
  const [date, setDate] = useState(initialEvent ? initialEvent.date.split('T')[0] : '');
  const [time, setTime] = useState(initialEvent ? (initialEvent.date.split('T')[1]?.slice(0,5) || '') : '');
  const [selectedAttendees, setSelectedAttendees] = useState<number[]>(initialEvent ? initialEvent.attendees : []);
  const [attendeeSearch, setAttendeeSearch] = useState('');

  // Filtered team members berdasarkan pencarian
  const filteredTeamMembers = useMemo(() => {
    if (!attendeeSearch.trim()) return teamMembers;
    return teamMembers.filter(member => member.name.toLowerCase().includes(attendeeSearch.toLowerCase()));
  }, [attendeeSearch, teamMembers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && date && time && selectedAttendees.length > 0) {
      const eventPayload = {
        ...(initialEvent ? { id: initialEvent.id } : {}),
        title: title.trim(),
        description: description.trim(),
        date: `${date}T${time}`,
        attendees: selectedAttendees
      };
      if (onSave) {
        onSave(eventPayload);
      } else {
        addEvent(eventPayload);
        setTitle('');
        setDescription('');
        setDate('');
        setTime('');
        setSelectedAttendees([]);
      }
      onClose();
    }
  };

  const handleAttendeeToggle = (id: number) => {
    setSelectedAttendees(prev => prev.includes(id) ? prev.filter(attId => attId !== id) : [...prev, id]);
  };

  return <Modal isOpen={isOpen} onClose={onClose} title="Create New Event">
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Event Title
          </label>
          <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter event title" required />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <input id="time" type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Attendees</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
            placeholder="Search team member..."
            value={attendeeSearch}
            onChange={e => setAttendeeSearch(e.target.value)}
          />
          <div className="max-h-32 overflow-y-auto border rounded bg-white">
            {filteredTeamMembers.map(member => (
              <div
                key={member.id}
                className={`flex items-center px-2 py-1 cursor-pointer hover:bg-blue-100 ${selectedAttendees.includes(member.id) ? 'bg-blue-50' : ''}`}
                onClick={() => handleAttendeeToggle(member.id)}
              >
                <span>{member.name}</span>
                {selectedAttendees.includes(member.id) && <span className="ml-auto text-blue-600 font-bold">✓</span>}
              </div>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={3} placeholder="Enter event description" required />
        </div>
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Create Event
            </button>
          </div>
        </div>
      </form>
    </Modal>;
};