import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar } from '../components/calendar/Calendar';
import { PlusCircleIcon } from 'lucide-react';
import { NewEventModal } from '../components/modals/NewEventModal';
import { EventDetailsModal } from '../components/calendar/EventDetailsModal';
export const Schedule = () => {
  const {
    scheduleEvents
  } = useApp();
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  return <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Schedule</h1>
        <button onClick={() => setIsNewEventModalOpen(true)} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <PlusCircleIcon size={18} className="mr-2" />
          <span>New Event</span>
        </button>
      </div>
      <Calendar events={scheduleEvents} onEventClick={event => setSelectedEvent(event)} />
      <NewEventModal isOpen={isNewEventModalOpen} onClose={() => setIsNewEventModalOpen(false)} />
      <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>;
};