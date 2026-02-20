// Social Pilot AI - Main Server
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './backend/config/index.js';
import apiRoutes from './backend/routes/api.js';
import { errorHandler, notFoundHandler } from './backend/middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend and public directories
app.use('/frontend', express.static(path.join(__dirname, 'frontend')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', apiRoutes);

// Serve main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Error handling
app.use(errorHandler);
app.use(notFoundHandler);

// Start server
app.listen(config.port, () => {
    console.log(`🚀 Social Pilot AI server running on http://localhost:${config.port}`);
    console.log(`📡 LLM Provider: ${config.llmProvider}`);
    console.log(`🔑 API Configured: ${config.llmApiKey ? 'Yes' : 'No - Set LLM_API_KEY in .env'}`);
    console.log(`📁 Frontend: http://localhost:${config.port}/frontend/index.html`);
});
