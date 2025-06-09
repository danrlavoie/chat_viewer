import fs from 'fs';
import path from 'path';

const CHAT_DATA_DIR = process.env.CHAT_DATA_DIR || path.join(__dirname, '../../../data/GoogleChat/Groups');

export const getChatData = (chatId: string) => {
    const groupInfoPath = path.join(CHAT_DATA_DIR, chatId, 'group_info.json');
    const messagesPath = path.join(CHAT_DATA_DIR, chatId, 'messages.json');

    const groupInfo = JSON.parse(fs.readFileSync(groupInfoPath, 'utf-8'));
    const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf-8'));

    return {
        groupInfo,
        messages: messages.messages,
    };
};

export const getAllChatIds = (): string[] => {
    try {
        return fs.readdirSync(CHAT_DATA_DIR)
            .filter(file => fs.statSync(path.join(CHAT_DATA_DIR, file)).isDirectory());
    } catch (error) {
        console.error('Error reading chat directories:', error);
        return [];
    }
};

export const getChatNames = (): Record<string, string | undefined> => {
    const chatIds = getAllChatIds();
    const chatNames: Record<string, string | undefined> = {};

    for (const chatId of chatIds) {
        try {
            const groupInfoPath = path.join(CHAT_DATA_DIR, chatId, 'group_info.json');
            if (fs.existsSync(groupInfoPath)) {
                const groupInfo = JSON.parse(fs.readFileSync(groupInfoPath, 'utf-8'));
                chatNames[chatId] = groupInfo.name;
            } else {
                chatNames[chatId] = undefined;
            }
        } catch (error) {
            console.error(`Error reading group info for chat ${chatId}:`, error);
            chatNames[chatId] = undefined;
        }
    }

    return chatNames;
};