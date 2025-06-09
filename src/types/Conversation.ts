
export interface Conversation {
    id: string;
    participants: ConversationParticipant[];
    events: ConversationEvent[];
};

export interface ConversationParticipant {
    id: string;
    name: string;
};

export interface ConversationEvent {
    id: string;
    timestamp: string;
    type: EventType;
    message_content: MessageContent;
};

export interface MessageContent {
    segment: Block[];
};

export interface Block {
    type: string;
    text: string;
    formatting: Formatting;
};

export interface Formatting {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
};

export type EventType =
    | 'REGULAR_CHAT_MESSAGE'
    | 'HANGOUT_EVENT'
    | 'RENAME_CONVERSATION'
    | 'ADD_USER';