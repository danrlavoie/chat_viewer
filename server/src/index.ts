import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes';
import path from 'path';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

// Enable CORS with more flexible configuration for Docker environment
app.use(cors({
  // Accept connections from both development and Docker environments
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env.FRONTEND_URL || ''
  ].filter((origin): origin is string => Boolean(origin)),
  methods: ['GET'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use('/api/chats', chatRoutes);

// Serve static files from the React build directory in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../../frontend/build')));
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});