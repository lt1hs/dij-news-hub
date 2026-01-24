import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { setupVite } from './vite';

const app = express();
app.use(express.json());

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: "Server working!", time: new Date().toISOString() });
});

// Mock API routes
app.get('/api/articles', (req, res) => {
  res.json([
    { id: '1', title: 'Sample Article', content: 'This is a sample article for testing.' }
  ]);
});

const server = createServer(app);

// Setup Vite for development
if (process.env.NODE_ENV === 'development') {
  await setupVite(app, server);
}

const port = 5000;
server.listen(port, 'localhost', () => {
  console.log(`Server running at http://localhost:${port}`);
});
