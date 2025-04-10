import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from 'lucide-react';
type Event = {
  id: string;
  title: string;
  date: string;
  description: string;
  attendees: string[];
};
type CalendarProps = {
  events: Event[];
  onEventClick: (event: Event) => void;
};
export const Calendar = ({
  events,
  onEventClick
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({
    start,
    end
  });
  const getEventsForDay = (date: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), date));
  };
  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const years = Array.from({
    length: 10
  }, (_, i) => new Date().getFullYear() - 5 + i);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <button onClick={handlePreviousMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeftIcon size={20} className="text-gray-600" />
          </button>
          <button onClick={() => setIsMonthPickerOpen(!isMonthPickerOpen)} className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-lg font-semibold text-gray-800">
              {format(currentDate, 'MMMM yyyy')}
            </span>
            <CalendarIcon size={20} className="text-gray-600" />
          </button>
          <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronRightIcon size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
      {isMonthPickerOpen && <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Month</h4>
              <div className="grid grid-cols-2 gap-2">
                {months.map((month, index) => <button key={month} onClick={() => {
              setCurrentDate(new Date(currentDate.getFullYear(), index));
              setIsMonthPickerOpen(false);
            }} className={`px-3 py-1 text-sm rounded-md ${currentDate.getMonth() === index ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>
                    {month}
                  </button>)}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Year</h4>
              <div className="grid grid-cols-2 gap-2">
                {years.map(year => <button key={year} onClick={() => {
              setCurrentDate(new Date(year, currentDate.getMonth()));
              setIsMonthPickerOpen(false);
            }} className={`px-3 py-1 text-sm rounded-md ${currentDate.getFullYear() === year ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}>
                    {year}
                  </button>)}
              </div>
            </div>
          </div>
        </div>}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => {
        const dayEvents = getEventsForDay(day);
        return <div key={day.toString()} className={`
                min-h-[100px] p-2 border rounded-lg
                ${isSameMonth(day, currentDate) ? 'bg-white' : 'bg-gray-50'}
                ${isSameDay(day, new Date()) ? 'border-blue-500' : 'border-gray-200'}
              `}>
              <div className="text-right mb-1">
                <span className={`text-sm ${isSameDay(day, new Date()) ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
                  {format(day, 'd')}
                </span>
              </div>
              {dayEvents.map(event => <div key={event.id} onClick={() => onEventClick(event)} className="text-xs p-1 mb-1 rounded bg-blue-100 text-blue-700 truncate cursor-pointer hover:bg-blue-200 transition-colors">
                  {event.title}
                </div>)}
            </div>;
      })}
      </div>
    </div>;
};