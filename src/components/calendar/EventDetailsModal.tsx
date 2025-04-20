import React from 'react';
import { Clock, Users, XIcon } from 'lucide-react';

export type TeamMember = {
  id: number;
  name: string;
  avatar: string;
};

export type ScheduleEvent = {
  id: string;
  title: string;
  date: string;
  description: string;
  attendees: number[];
};

type EventDetailsModalProps = {
  event: ScheduleEvent | null;
  onClose: () => void;
  teamMembers: TeamMember[];
  onEdit?: (event: ScheduleEvent) => void;
  onDelete?: (event: ScheduleEvent) => void;
};

import { useApp } from '../../context/AppContext';
import { useState } from 'react';
import { NewEventModal } from '../modals/NewEventModal';

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  onClose,
  teamMembers
}) => {
  const { updateEvent, deleteEvent } = useApp();
  const [isEdit, setIsEdit] = useState(false);

  if (!event) return null;

  const handleEdit = (updated: ScheduleEvent) => {
    updateEvent(updated);
    setIsEdit(false);
    onClose();
  };

  const handleDelete = () => {
    deleteEvent(event.id);
    onClose();
  };

  if (isEdit) {
    return (
      <NewEventModal
        isOpen={true}
        onClose={() => setIsEdit(false)}
        initialEvent={event}
        teamMembers={teamMembers}
        onSave={handleEdit}
      />
    );
  }
  if (!event) return null;

  const eventDate = new Date(event.date);
  const attendeeDetails = (event.attendees || []).map((id: number) => (teamMembers || []).find(member => member.id === id)).filter(Boolean);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XIcon size={20} />
          </button>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {event.title}
          </h2>
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <Clock size={16} className="mr-2" />
              <span>{eventDate.toLocaleString()}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users size={16} className="mr-2" />
              <span>{attendeeDetails.length} attendees</span>
            </div>
          </div>
          <div className="mb-4 text-gray-700 whitespace-pre-line">
            {event.description}
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Attendees
            </h3>
            <div className="flex flex-wrap gap-2">
              {attendeeDetails.map((member) =>
                member && (
                  <div
                    key={member.id}
                    className="flex items-center space-x-2 bg-gray-50 rounded-full px-3 py-1"
                  >
                    <span className="text-sm text-gray-700">
                      {member.name}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-sm"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};