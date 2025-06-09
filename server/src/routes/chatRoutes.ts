import { Router } from 'express';
import { getChatData, getAllChatIds, getChatNames } from '../services/chatFileService';
import fs from 'fs';
import path from 'path';

const router = Router();

// Add new route to get me emails
router.get('/me', async (_req, res) => {
    try {
        const configPath = path.join(__dirname, '../../../config/config.json');
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        res.json({ me: config.me });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving me email', error });
    }
});

// Route to get all available chat IDs
router.get('/chats', async (_req, res) => {
    try {
        const chatIds = getAllChatIds();
        res.json({ chatIds });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving chat IDs', error });
    }
});

// Route to get chat data by chat ID
router.get('/chat/:id', async (req, res) => {
    try {
        const chatId = req.params.id;
        const chatData = getChatData(chatId);
        res.json(chatData);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving chat data', error });
    }
});

// Route to get all chat IDs with their names
router.get('/chats/names', async (_req, res) => {
    try {
        const chatNames = getChatNames();
        res.json(chatNames);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving chat names', error });
    }
});

export default router;