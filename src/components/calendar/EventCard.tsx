import React from 'react';
import { format } from 'date-fns';
import { Clock, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';
type EventCardProps = {
  event: {
    id: string;
    title: string;
    date: string;
    description: string;
    attendees: string[];
  };
};
export const EventCard = ({
  event
}: EventCardProps) => {
  const {
    teamMembers
  } = useApp();
  const eventDate = new Date(event.date);
  const attendeeDetails = event.attendees.map(id => teamMembers.find(member => member.id === id)).filter(member => member !== undefined);
  return <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
      <h3 className="font-medium text-gray-800 mb-2">{event.title}</h3>
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Clock size={16} className="mr-2" />
          <span>{format(eventDate, 'MMM d, yyyy h:mm a')}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Users size={16} className="mr-2" />
          <span>{attendeeDetails.length} attendees</span>
        </div>
        <p className="text-sm text-gray-600">{event.description}</p>
        <div className="flex -space-x-2">
          {attendeeDetails.map(member => member && <img key={member.id} src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full border-2 border-white" title={member.name} />)}
        </div>
      </div>
    </div>;
};