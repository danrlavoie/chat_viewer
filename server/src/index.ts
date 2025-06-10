import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes';
import path from 'path';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

// Enable CORS
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/chats', chatRoutes);

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../../frontend/build')));

// Handle any requests that don't match the above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});