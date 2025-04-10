import React from 'react';
import { PlusIcon } from 'lucide-react';
type Message = {
  id: string;
  author: string;
  content: string;
  date: string;
  avatar: string;
};
type MessageBoardProps = {
  messages: Message[];
  onNewMessage: () => void;
};
export const MessageBoard: React.FC<MessageBoardProps> = ({
  messages,
  onNewMessage
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  return <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Recent Messages</h3>
        <button onClick={onNewMessage} className="flex items-center text-sm text-blue-600 hover:text-blue-700">
          <PlusIcon size={16} className="mr-1" />
          <span>New Message</span>
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {messages.length > 0 ? messages.map(message => <div key={message.id} className="p-4">
              <div className="flex items-start">
                <img src={message.avatar} alt={message.author} className="w-10 h-10 rounded-full mr-3 object-cover border border-gray-200" />
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-medium text-gray-800">
                      {message.author}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(message.date)}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{message.content}</p>
                </div>
              </div>
            </div>) : <div className="p-4 text-center text-gray-500">No messages yet</div>}
      </div>
    </div>;
};