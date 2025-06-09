export const loadChatData = async (chatId: string) => {
    const groupInfoResponse = await fetch(`/path/to/chat/data/${chatId}/group_info.json`);
    const messagesResponse = await fetch(`/path/to/chat/data/${chatId}/messages.json`);

    const groupInfo = await groupInfoResponse.json();
    const messages = await messagesResponse.json();

    return {
        groupInfo,
        messages: messages.messages,
    };
};

export const processMessages = (messages: any[]) => {
    return messages.map(message => ({
        id: message.message_id,
        content: message.content, // Assuming content is part of the message structure
        timestamp: message.timestamp, // Assuming timestamp is part of the message structure
    }));
};