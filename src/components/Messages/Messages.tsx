import React, { useState, useEffect, useRef } from 'react';
import Message from '../Message/Message';
import { Message as MessageType } from '../../types/Message';
import './Messages.css';

interface MessagesProps {
  messages: MessageType[];
  selectedMessageId: string;
  onMessageSelect: (messageId: string) => void;
}

const MESSAGES_PER_PAGE = 500;

const Messages: React.FC<MessagesProps> = ({ messages, selectedMessageId, onMessageSelect }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const messagesRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(messages.length / MESSAGES_PER_PAGE);
  const startIndex = currentPage * MESSAGES_PER_PAGE;
  const endIndex = startIndex + MESSAGES_PER_PAGE;
  const currentMessages = messages.slice(startIndex, endIndex);

  // Add this new effect to reset page when messages change
  useEffect(() => {
    setCurrentPage(0);
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  // Keep the existing effect for handling selectedMessageId
  useEffect(() => {
    if (selectedMessageId) {
      const messageIndex = messages.findIndex(m => m.message_id === selectedMessageId);
      if (messageIndex !== -1) {
        const targetPage = Math.floor(messageIndex / MESSAGES_PER_PAGE);
        setCurrentPage(targetPage);

        // Wait for next render then scroll to message
        setTimeout(() => {
          const messageElement = document.getElementById(selectedMessageId);

          if (messageElement && messagesRef.current) {
            const containerHeight = messagesRef.current.clientHeight;
            const messageTop = messageElement.offsetTop;
            const messageHeight = messageElement.clientHeight;
            const targetScroll = messageTop - (containerHeight / 2) + (messageHeight / 2) - 200;
            if (messagesRef.current) {
              messagesRef.current.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
              });
            }
          }
        }, 0);
      }
    } else {
      setCurrentPage(0);
      if (messagesRef.current) {
        messagesRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedMessageId, messages]);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
    if (messagesRef.current) {
      setTimeout(() => {
        if (messagesRef.current) {
          messagesRef.current.scrollTo({
            top: messagesRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 0);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="messages-container">
      <div className="messages" ref={messagesRef}>
        {currentMessages.map((message) => (
          <Message
            key={message.message_id}
            message={message}
            isSelected={message.message_id === selectedMessageId}
            onClick={() => onMessageSelect(message.message_id)}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            ◄ Previous
          </button>
          <span>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            Next ►
          </button>
        </div>
      )}

    </div>
  );
};

export default Messages;