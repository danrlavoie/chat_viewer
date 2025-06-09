import React, { useState, useMemo } from 'react';
import { Chat as ChatType } from '../../types/Chat';
import Messages from '../Messages/Messages';
import './Chat.css';

const Chat: React.FC<ChatType> = ({ id, groupInfo, messages }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState('');
  const [showMembers, setShowMembers] = useState(false);

  const filteredMessages = useMemo(() => {
    if (!searchTerm) return messages;

    return messages.filter(message =>
      message?.text?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [messages, searchTerm]);

  const handleMessageSelect = (messageId: string) => {
    if (searchTerm) {
      setSearchTerm('');
    }
    setSelectedMessageId(messageId);
  };

  return (
    <div className="chat" id={id}>
      <div className="chat-header">
        <h3 className="chat-id-heading">{id}</h3>
          <div className="search-container">
            <div className="search-input-wrapper">
              <img 
                src={`${process.env.PUBLIC_URL}/magnify-small.png`} 
                alt="Search" 
                className="search-icon"
              />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedMessageId('');
                }}
                className="search-input"
              />
            </div>
            {searchTerm && (
              <div className="search-stats">
                Found {filteredMessages.length} matching messages
              </div>
            )}
          </div>
          <div className="members-container">
            <h4>Members: {groupInfo.members.length}</h4>
            <div className="members-popover">
              <ul>
                {groupInfo.members.map((member) => (
                  <li key={member.email}>{member.name} ({member.email})</li>
                ))}
              </ul>
            </div>
          </div>


      </div>
      <Messages
        messages={filteredMessages}
        selectedMessageId={selectedMessageId}
        onMessageSelect={handleMessageSelect}
      />
    </div>
  );
};

export default Chat;