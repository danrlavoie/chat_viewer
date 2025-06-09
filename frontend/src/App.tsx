import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
import { Chat as ChatType } from './types/Chat';
import { MeProvider } from './context/MeContext';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [meEmail, setMeEmail] = useState<string[]>([]);
  const [chatIds, setChatIds] = useState<string[]>([]);
  const [chatNames, setChatNames] = useState<Record<string, string | undefined>>({});  // Add this line
  const [selectedChatId, setSelectedChatId] = useState<string>('');
  const [chatData, setChatData] = useState<ChatType | null>(null);

  // Fetch available chat IDs on component mount
  useEffect(() => {
    const fetchChatIds = async () => {
      try {
        const response = await fetch('/api/chats/chats');
        const data = await response.json();
        setChatIds(data.chatIds);
      } catch (error) {
        console.error('Error fetching chat IDs:', error);
      }
    };

    fetchChatIds();
  }, []);

  // Fetch chat data when selected chat changes
  useEffect(() => {
    const fetchChatData = async () => {
      if (!selectedChatId) return;

      try {
        const response = await fetch(`/api/chats/chat/${selectedChatId}`);
        const data = await response.json();
        setChatData(data);
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    fetchChatData();
  }, [selectedChatId]);

  // Update the fetch me email effect
  useEffect(() => {
    const fetchMeEmail = async () => {
      try {
        const response = await fetch('/api/chats/me');
        const data = await response.json();
        setMeEmail(data.me); // data.me is now an array of strings
      } catch (error) {
        console.error('Error fetching me email:', error);
      }
    };

    fetchMeEmail();
  }, []);

  // Add new effect to fetch chat names
  useEffect(() => {
    const fetchChatNames = async () => {
      try {
        const response = await fetch('/api/chats/chats/names');
        const data = await response.json();
        setChatNames(data);
      } catch (error) {
        console.error('Error fetching chat names:', error);
      }
    };

    fetchChatNames();
  }, []);

  return (
    <MeProvider value={meEmail}>  {/* MeContext now provides string[] */}
      <div className={`App ${isDark ? 'dark' : ''}`}>
        <div className="header">
          <img src={`${process.env.PUBLIC_URL}/google-talk-icon-cropped.png`} alt="Google Talk"/>
          <div className="chat-selector">
            <span><b>Select a chat: </b></span>
            <select
              value={selectedChatId}
              onChange={(e) => setSelectedChatId(e.target.value)}
            >
              <option value="">Select a chat</option>
              {chatIds.sort((a, b) => {
                const nameA = chatNames[a] || a;
                const nameB = chatNames[b] || b;
                return nameA.localeCompare(nameB, "en");
              }).map((id) => (
                <option key={id} value={id}>
                  {chatNames[id] || id}
                </option>
              ))}
            </select>
          </div>

        </div>

        {chatData && selectedChatId && (
          <Chat
            id={chatNames[selectedChatId] || selectedChatId}
            groupInfo={chatData.groupInfo}
            messages={chatData.messages}
          />
        )}
      </div>
    </MeProvider>
  );
};

export default App;