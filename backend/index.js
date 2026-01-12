/**
 * Calendar Co-pilot Backend Server
 * 
 * Express server for MongoDB operations.
 * Handles tutor availability data persistence.
 * 
 * To run:
 *   node backend/index.js
 */

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import tutorRoutes from './routes/tutors.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tutors', tutorRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'Calendar Co-pilot API is running'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 API endpoints:`);
    console.log(`   GET    /api/tutors        - List all tutors`);
    console.log(`   GET    /api/tutors/:id    - Get tutor by ID`);
    console.log(`   POST   /api/tutors        - Create/update tutor`);
    console.log(`   DELETE /api/tutors/:id    - Delete tutor`);
    console.log(`   GET    /api/health        - Health check`);
  });
};

startServer();
