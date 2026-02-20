# Social Pilot AI - Project Structure

This document describes the reorganized project structure with separated frontend and backend folders.

## 📁 Project Structure

```
social-pilot/
├── backend/                    # Backend server code
│   ├── config/                 # Configuration files
│   │   └── index.js           # App configuration (API keys, ports, etc.)
│   ├── controllers/            # Business logic
│   │   └── contentController.js  # Content generation logic
│   ├── middleware/             # Express middleware
│   │   └── errorHandler.js    # Error handling middleware
│   ├── routes/                 # API route definitions
│   │   └── api.js             # Main API routes
│   └── server.js              # (Root) Old server - now using server.js at root
│
├── frontend/                   # Frontend application
│   ├── css/                    # Stylesheets
│   │   └── styles.css         # Main CSS file
│   ├── js/                     # JavaScript files
│   │   ├── components/         # React components
│   │   │   ├── BrandVoiceManager.js
│   │   │   ├── ContentCard.js
│   │   │   ├── ContentCards.js
│   │   │   ├── CreateCampaign.js
│   │   │   ├── FormComponents.js
│   │   │   ├── HistoryComponents.js
│   │   │   ├── LanguageSelector.js
│   │   │   ├── MobilePreviewModal.js
│   │   │   ├── Sidebar.js
│   │   │   ├── UIComponents.js
│   │   │   └── VoiceInput.js
│   │   ├── utils/              # Utility functions
│   │   └── App.js              # Main React app component
│   └── index.html              # Main HTML file
│
├── public/                     # Static assets (images, etc.)
├── server.js                   # Main Express server entry point
├── package.json                # Node.js dependencies
├── .env                        # Environment variables (create from .env.example)
└── .env.example                # Environment variables template
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env and add your LLM_API_KEY
```

### 3. Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### 4. Access the Application
- **Main App**: http://localhost:5000
- **Frontend Direct**: http://localhost:5000/frontend/index.html
- **API Health**: http://localhost:5000/api/health

## 📂 Folder Descriptions

### Backend

#### `backend/config/`
Contains application configuration including:
- API keys
- Port settings
- LLM provider selection

#### `backend/controllers/`
Business logic for:
- Content generation (Gemini/OpenAI)
- API integrations

#### `backend/middleware/`
Express middleware for:
- Error handling
- 404 responses
- Request validation

#### `backend/routes/`
API endpoint definitions:
- `/api/generate` - Generate social media content
- `/api/health` - Health check endpoint

### Frontend

#### `frontend/css/`
Stylesheets:
- Custom CSS variables
- Animations
- Component styles
- Dark mode support

#### `frontend/js/components/`
React components (each in its own file):
- **BrandVoiceManager** - Brand voice personality settings
- **ContentCard** - Individual platform content display
- **ContentCards** - Grid of all generated content
- **CreateCampaign** - Main content generation form
- **FormComponents** - Reusable form elements
- **HistoryComponents** - Campaign history UI
- **LanguageSelector** - Language selection dropdown
- **MobilePreviewModal** - Mobile preview popup
- **Sidebar** - Navigation sidebar
- **UIComponents** - Common UI elements
- **VoiceInput** - Voice-to-text input

#### `frontend/js/App.js`
Main React application component that:
- Manages global state
- Handles routing between tabs
- Coordinates all components

## 🔧 Configuration

### Environment Variables (.env)

```env
# Server Configuration
PORT=5000

# LLM Provider (gemini or openai)
LLM_PROVIDER=gemini

# API Key (required)
LLM_API_KEY=your_api_key_here
```

## 📝 API Endpoints

### POST /api/generate
Generate social media content for a product.

**Request:**
- `productDescription` (string, required)
- `image` (file, optional)

**Response:**
```json
{
  "success": true,
  "content": {
    "instagram": { "text": "...", "hashtags": [] },
    "linkedin": { "text": "...", "headline": "..." },
    "x": { "text": "...", "topics": [] },
    "tiktok": { "hook": "...", "script": "...", "trending": "..." }
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### GET /api/health
Check server health and configuration.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "provider": "gemini",
  "configured": true
}
```

## 🎨 Features

### Frontend
- ✅ 12 social media platforms supported
- ✅ Dark mode support
- ✅ Voice-to-text input
- ✅ Mobile preview modal
- ✅ Campaign history with search
- ✅ Brand voice customization
- ✅ Multi-language support (8 languages)
- ✅ Real-time character limit tracking
- ✅ Keyboard shortcuts (Ctrl+Enter)

### Backend
- ✅ Gemini AI integration
- ✅ OpenAI integration (optional)
- ✅ Image upload support
- ✅ Error handling
- ✅ CORS enabled
- ✅ Health check endpoint

## 🛠️ Development

### Adding New Components
1. Create new `.js` file in `frontend/js/components/`
2. Add script tag in `frontend/index.html`
3. Import and use in `App.js` or other components

### Adding New API Routes
1. Add route handler in `backend/controllers/`
2. Define route in `backend/routes/api.js`
3. Import and use in `server.js`

## 📦 Dependencies

### Production
- `express` - Web framework
- `cors` - CORS middleware
- `dotenv` - Environment variables
- `multer` - File upload handling
- `node-fetch` - HTTP client
- `axios` - HTTP client

## 🔐 Security Notes

- Never commit `.env` file
- Keep API keys secret
- Use HTTPS in production
- Validate all user inputs
- Set appropriate CORS policies

## 📄 License

ISC
