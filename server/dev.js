import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// API routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'API working', timestamp: new Date().toISOString() });
});

app.get('/api/login', (req, res) => {
  res.redirect('/');
});

app.get('/api/auth/user', (req, res) => {
  res.json({
    id: 'local-dev-user',
    email: 'dev@example.com',
    firstName: 'Dev',
    lastName: 'User'
  });
});

app.get('/api/articles', (req, res) => {
  res.json([
    { id: '1', title: 'Sample News Article', content: 'This is a sample article.' },
    { id: '2', title: 'Another Article', content: 'Another sample article.' }
  ]);
});

// Create Vite server with proper config
const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'custom',
  root: path.resolve(__dirname, '../client'),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, '../client/src'),
      "@shared": path.resolve(__dirname, '../shared'),
      "@assets": path.resolve(__dirname, '../attached_assets'),
    },
  },
});

app.use(vite.middlewares);

// Serve React app for all non-API routes
app.use('*', async (req, res, next) => {
  const url = req.originalUrl;
  
  try {
    const template = await vite.transformIndexHtml(url, `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NewsHub - AI-Powered News Aggregator</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
    `);
    
    res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
  } catch (e) {
    vite.ssrFixStacktrace(e);
    next(e);
  }
});

const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Development server running at:`);
  console.log(`  Local:   http://localhost:${port}`);
  console.log(`  Network: http://0.0.0.0:${port}`);
});
