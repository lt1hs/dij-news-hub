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
  const hoursAgo = (hours) => new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
  res.json([
    {
      id: '1',
      title: 'Chipmakers accelerate investment in next-generation fabrication plants',
      summary: 'Major semiconductor manufacturers are expanding advanced production capacity as demand from AI infrastructure and consumer devices continues to rise.',
      content: 'Semiconductor manufacturers announced a new round of investments in advanced fabrication capacity, with projects focused on smaller process nodes and more efficient packaging.',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=600&fit=crop',
      sources: ['Reuters'], category: 'Technology', tags: ['chips', 'manufacturing'],
      likeCount: 184, repostCount: 42, replyCount: 19, bookmarkCount: 61, publishedAt: hoursAgo(0.6)
    },
    {
      id: '2',
      title: 'Central banks signal a cautious path toward lower interest rates',
      summary: 'Policymakers are weighing easing inflation against resilient labour markets as investors reassess the timing of the next round of rate cuts.',
      content: 'Officials emphasized that future decisions will remain dependent on inflation and employment data, tempering expectations for rapid monetary easing.',
      imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=900&h=600&fit=crop',
      sources: ['Financial Times', 'Bloomberg'], category: 'Business', tags: ['rates', 'economy'],
      likeCount: 129, repostCount: 31, replyCount: 27, bookmarkCount: 48, publishedAt: hoursAgo(1.4)
    },
    {
      id: '3',
      title: 'European energy markets adjust to a faster renewable transition',
      summary: 'Grid operators are increasing storage and cross-border capacity as wind and solar generation account for a larger share of daily electricity supply.',
      content: 'Utilities and regulators are coordinating new storage projects and transmission links to manage a growing share of variable renewable generation.',
      imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&h=600&fit=crop',
      sources: ['Reuters Energy'], category: 'Energy', tags: ['renewables', 'grid'],
      likeCount: 96, repostCount: 24, replyCount: 12, bookmarkCount: 37, publishedAt: hoursAgo(2.2)
    },
    {
      id: '4',
      title: 'New satellite network promises earlier detection of extreme weather',
      summary: 'A new generation of low-orbit sensors will provide more frequent atmospheric measurements for forecasters and emergency-response teams.',
      content: 'The network combines thermal imaging and atmospheric sensors to improve forecasting coverage over oceans and remote regions.',
      imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&h=600&fit=crop',
      sources: ['Nature News'], category: 'Science', tags: ['climate', 'space'],
      likeCount: 211, repostCount: 58, replyCount: 23, bookmarkCount: 74, publishedAt: hoursAgo(3.1)
    },
    {
      id: '5',
      title: 'Global shipping firms test new routes and cleaner maritime fuels',
      summary: 'Carriers are balancing supply-chain resilience with emissions targets through alternative fuels, fleet upgrades, and revised port networks.',
      content: 'Shipping groups are testing methanol-powered vessels and diversifying port calls after several years of disruption to major trade corridors.',
      imageUrl: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=900&h=600&fit=crop',
      sources: ['Associated Press'], category: 'World', tags: ['shipping', 'trade'],
      likeCount: 73, repostCount: 18, replyCount: 9, bookmarkCount: 22, publishedAt: hoursAgo(4.5)
    },
    {
      id: '6',
      title: 'Hospitals expand remote monitoring for patients with chronic conditions',
      summary: 'Health systems are deploying connected devices and clinician dashboards to identify warning signs before patients require emergency care.',
      content: 'Remote monitoring programmes are moving beyond pilot projects as hospitals evaluate outcomes, staffing needs, and patient privacy safeguards.',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&h=600&fit=crop',
      sources: ['STAT'], category: 'Health', tags: ['healthcare', 'devices'],
      likeCount: 158, repostCount: 36, replyCount: 21, bookmarkCount: 65, publishedAt: hoursAgo(6)
    },
    {
      id: '7',
      title: 'Cities rethink public transport as commuting patterns continue to change',
      summary: 'Transit agencies are redesigning schedules and ticketing systems around more flexible work weeks and rising weekend ridership.',
      content: 'Agencies are using ridership data to shift service away from traditional peak-only patterns and improve connections outside city centres.',
      imageUrl: 'https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=900&h=600&fit=crop',
      sources: ['The Guardian'], category: 'Policy', tags: ['cities', 'transport'],
      likeCount: 87, repostCount: 15, replyCount: 33, bookmarkCount: 29, publishedAt: hoursAgo(8)
    },
    {
      id: '8',
      title: 'Open-source software becomes central to enterprise AI strategy',
      summary: 'Companies are combining proprietary systems with open models to gain more control over costs, deployment, and sensitive internal data.',
      content: 'Technology leaders say open tooling is increasingly important for deploying specialized models inside existing enterprise infrastructure.',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=600&fit=crop',
      sources: ['Wired'], category: 'Technology', tags: ['software', 'enterprise'],
      likeCount: 245, repostCount: 67, replyCount: 41, bookmarkCount: 102, publishedAt: hoursAgo(10)
    }
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
