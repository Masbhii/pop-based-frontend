import React from 'react';
import { format } from 'date-fns';
import { Clock, Users, XIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
type EventDetailsModalProps = {
  event: {
    id: string;
    title: string;
    date: string;
    description: string;
    attendees: string[];
  } | null;
  onClose: () => void;
};
export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  onClose
}) => {
  const {
    teamMembers
  } = useApp();
  if (!event) return null;
  const eventDate = new Date(event.date);
  const attendeeDetails = event.attendees.map(id => teamMembers.find(member => member.id === id)).filter(member => member !== undefined);
  return <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all animate-slideUp" onClick={e => e.stopPropagation()}>
        <div className="relative p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
            <XIcon size={20} />
          </button>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {event.title}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Clock size={18} className="mr-2" />
              <span>{format(eventDate, 'MMMM d, yyyy h:mm a')}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users size={18} className="mr-2" />
              <span>{attendeeDetails.length} attendees</span>
            </div>
            <p className="text-gray-600 border-t border-gray-100 pt-4">
              {event.description}
            </p>
            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Attendees
              </h3>
              <div className="flex flex-wrap gap-2">
                {attendeeDetails.map(member => member && <div key={member.id} className="flex items-center space-x-2 bg-gray-50 rounded-full px-3 py-1">
                        <img src={member.avatar} alt={member.name} className="w-6 h-6 rounded-full" />
                        <span className="text-sm text-gray-700">
                          {member.name}
                        </span>
                      </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};