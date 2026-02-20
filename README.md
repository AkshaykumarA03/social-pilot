# Social Pilot AI

AI-powered social media content generation platform built with Node.js, Express, and React (CDN).  
Generate platform-specific posts, create AI images, and manage campaign content from one interface.

## Features

- Multi-platform content generation (`instagram`, `linkedin`, `x`, `tiktok`, etc.)
- AI image generation endpoint
- Campaign creation, templates, bulk generation, and history
- Frontend served by Express
- Deployment-ready API routing using relative `/api/*` paths

## Tech Stack

- Node.js
- Express
- React 18 (CDN)
- Tailwind CSS (CDN)

## Project Structure

- `server.js` - main server entry
- `backend/` - API routes, config, controllers
- `frontend/` - UI files and components
- `.env.example` - environment template
- `.gitignore` - excludes secrets and local artifacts

## Local Setup

1. Install dependencies
```bash
npm install
Create environment file
cp .env.example .env
Add your API key in .env
LLM_PROVIDER=groq
LLM_API_KEY=your_real_api_key
PORT=3000
Start app
npm start
Open:

App: http://localhost:3000
Health: http://localhost:3000/api/health
Environment Variables
PORT - server port
LLM_PROVIDER - groq or gemini or openai
LLM_API_KEY - provider API key
Deployment (Render example)
Root Directory: social pilot
Build Command: npm install
Start Command: npm start
Add environment variables in Render dashboard:
LLM_PROVIDER
LLM_API_KEY
PORT (optional)
Security Notes
Never commit .env
Keep API keys only in environment variables
Rotate keys immediately if leaked
License
