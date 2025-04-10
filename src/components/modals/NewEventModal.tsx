import React, { useState } from 'react';
import { Modal } from './Modal';
import { useApp } from '../../context/AppContext';
type NewEventModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export const NewEventModal: React.FC<NewEventModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    teamMembers,
    addEvent
  } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && date && time && selectedAttendees.length > 0) {
      addEvent({
        title: title.trim(),
        description: description.trim(),
        date: `${date}T${time}`,
        attendees: selectedAttendees
      });
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setSelectedAttendees([]);
      onClose();
    }
  };
  const handleAttendeeToggle = (memberId: string) => {
    setSelectedAttendees(prev => prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]);
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attendees
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
              {teamMembers.map(member => <div key={member.id} className="flex items-center">
                  <input type="checkbox" id={`attendee-${member.id}`} checked={selectedAttendees.includes(member.id)} onChange={() => handleAttendeeToggle(member.id)} className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                  <label htmlFor={`attendee-${member.id}`} className="ml-2 text-sm text-gray-700">
                    {member.name} - {member.role}
                  </label>
                </div>)}
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