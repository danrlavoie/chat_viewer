import React from "react";
import "./Message.css";
import { Message as MessageType } from "../../types/Message";
import { useMeEmail } from "../../context/MeContext";

// Add the formatText function
const formatText = (text: string): React.ReactNode => {
    // URL regex pattern
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    
    // Split the text by URLs and map through parts
    const parts = text.split(urlPattern);
    return parts.map((part, index) => {
        // Check if this part matches URL pattern
        if (urlPattern.test(part)) {
            return (
                <a 
                    key={index} 
                    href={`https://web.archive.org/web/*/${part}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    {part}
                </a>
            );
        }
        return part;
    });
};

const parseGoogleChatDate = (dateString: string): Date => {
    // Example: "Thursday, August 14, 2014 at 3:19:41 AM UTC"
    const [_, month, day, year, time, meridiem] =
        dateString.match(/\w+, (\w+) (\d+), (\d+) at (\d+:\d+:\d+) (AM|PM)/)
        || [];
    
    // console.log(`Parsed date components: ${month}, ${day}, ${year}, ${time}, ${meridiem}`);
    // if (!month || !day || !year || !time || !meridiem) {
    //     throw new Error(`Invalid date format: ${dateString}`);
    // }

    // Construct a date string that JS can parse
    return new Date(`${month} ${day}, ${year} ${time} ${meridiem} UTC`);
};

interface MessageProps {
  message: MessageType;
  isSelected: boolean;
  onClick: () => void;
}

const Message: React.FC<MessageProps> = ({ message, isSelected, onClick }) => {
    const meEmails = useMeEmail();
    const { text, created_date, creator } = message;
    const { name, email } = creator;
    const isMe = meEmails.includes(email);  // Changed to check array inclusion
    
    let timestamp;
    try {
        const date = parseGoogleChatDate(created_date);
        timestamp = date.toLocaleString("en-US", { timeZone: "America/New_York" });
    } catch (error) {
        // console.error('Error parsing date:', error);
        timestamp = created_date; // Fallback to original string if parsing fails
    }

    return (
        <div
            id={message.message_id}
            className={`message ${isSelected ? 'selected' : ''} ${isMe ? 'isme' : ''}`}
            onClick={onClick}
        >
            <p className="message-content">
                <b>{`${name}: `}</b>
                {formatText(text || '')}
            </p>
            <span className="message-timestamp"><i>{timestamp}</i></span>
        </div>
    );
};

export default Message;