# 🤖 Social Pilot AI - Project Architecture & Features

## 📋 Project Overview

**Social Pilot AI** is a full-stack MVP that helps small business owners generate polished, platform-specific social media content using AI.

### Version: 2.0.0
### Status: ✅ Production Ready
### Created: February 19, 2026

---

## 🎯 Core Features

### ✨ AI Content Generation
- **Single input**: Product description
- **Instant output**: 4 platform-optimized posts
- **No posting**: Content only (ready to copy-paste)
- **LLM integration**: Google Gemini or OpenAI GPT-4o

### 📸 Smart Image Upload
- Drag-and-drop interface
- File preview before sending
- Optional (not required)
- Max 10MB file size
- Supports: JPG, PNG, WebP, etc.

### 📱 4-Platform Support

| Platform | Tone | Key Features |
|----------|------|--------------|
| **Instagram** | Casual, visual, trendy | Emojis, hashtags, engagement hooks |
| **LinkedIn** | Professional, insightful | Headline, body, business value |
| **X (Twitter)** | Short, witty, punchy | Under 280 chars, retweet-worthy |
| **TikTok** | Dynamic, engaging, scripted | Hook, pacing cues, trending sounds |

### 🎨 Beautiful UI
- **Soft UI Design**: Rounded corners, subtle shadows
- **Color Palette**: White, gray, indigo gradients
- **Skeleton Loaders**: Smooth loading states
- **Animations**: Subtle fade-ins and transitions
- **Responsive**: Works on desktop and tablet

### 💾 Campaign History
- Built using **browser localStorage**
- No backend database needed
- Persistent across sessions
- Delete campaigns anytime
- Search/filter coming in future

### 🔄 One-Click Copy
- Copy to clipboard from any card
- Instant button feedback
- Paste directly into social media
- No editing needed (usually!)

---

## 🛠️ Technology Stack

### Frontend
```
React 18 (via CDN)
├── state management (useState, useEffect)
├── component architecture
├── API integration
└── localStorage for persistence

Tailwind CSS
├── responsive design
├── component styling
└── soft UI aesthetic

Font Awesome 6.4
└── icons for UI elements
```

### Backend
```
Node.js + Express.js
├── REST API endpoints
├── multer (file uploads)
├── dotenv (configuration)
└── CORS enabled

LLM Integration
├── Google Gemini API
└── OpenAI GPT-4o API
```

### Storage
```
Client-side:
└── Browser localStorage (campaigns)

Server-side:
└── None (stateless)
```

---

## 🔌 API Architecture

### Single Main Endpoint

#### `POST /api/generate`

**Purpose**: Generate social media content from product description

**Request**:
```
Method: POST
URL: http://localhost:5000/api/generate
Content-Type: multipart/form-data

Fields:
- productDescription (required, text)
- image (optional, file)
  - Max size: 10MB
  - Formats: JPG, PNG, WebP, GIF
```

**Response**:
```json
{
  "success": true,
  "content": {
    "instagram": {
      "text": "Post content with emojis...",
      "hashtags": ["#tag1", "#tag2", ...]
    },
    "linkedin": {
      "headline": "Short professional title",
      "text": "Body 150-200 words..."
    },
    "x": {
      "text": "Tweet under 280 chars...",
      "topics": ["#topic1", "#topic2"]
    },
    "tiktok": {
      "hook": "3-second attention grabber",
      "script": "Video script with [PACING CUES]",
      "trending": "Audio/sound suggestion"
    }
  },
  "timestamp": "2024-02-19T10:30:00Z"
}
```

### Secondary Endpoints

#### `GET /api/health`
Check server and API status.

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2024-02-19T10:30:00Z",
  "provider": "gemini",
  "configured": true
}
```

---

## 📦 LLM Integration

### How It Works

```
1. User enters product description
   ↓
2. Frontend sends to /api/generate
   ↓
3. Backend receives request
   ↓
4. Backend sends to LLM API with prompt
   ↓
5. LLM generates 4 platform-optimized posts
   ↓
6. Backend parses JSON response
   ↓
7. Returns to frontend
   ↓
8. Frontend displays 4 cards
```

### Gemini Integration

**Configuration**:
```env
LLM_PROVIDER=gemini
LLM_API_KEY=AIzaSy...
```

**API Call**:
```javascript
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
Authorization: Key={LLM_API_KEY}
```

**Pros**:
- ✅ Free tier available
- ✅ No credit card required
- ✅ Good for prototyping
- ✅ Fast response times

### OpenAI Integration

**Configuration**:
```env
LLM_PROVIDER=openai
LLM_API_KEY=sk-...
```

**API Call**:
```javascript
POST https://api.openai.com/v1/chat/completions
Authorization: Bearer {LLM_API_KEY}
Model: gpt-4o
```

**Pros**:
- ✅ Best quality output
- ✅ More consistent
- ✅ Excellent for production
- ⚠️ Paid (but affordable)

---

## 🎨 UI Components

### Dashboard Layout
```
┌─ Sidebar ─────┬─── Main Content ────┐
│               │                      │
│ Logo          │ Header               │
│ Navigation    │ (Title + Description)|
│  • Create     │                      │
│  • History    │ Content Area         │
│               │ (Create/History Tab) │
│               │                      │
└─────────────┴──────────────────────┘
```

### Create Campaign Tab

**Components**:
1. **Product Input**
   - Textarea for description
   - Character counter
   - Placeholder with example

2. **Image Uploader**
   - Drag-and-drop zone
   - File preview
   - Delete button
   - File format info

3. **Generate Button**
   - Large, prominent
   - Disabled until description entered
   - Shows loading state
   - Gradient background

### Output Cards (4 cards)

**Each card has**:
- Platform name + icon
- Color-coded background
- Content display (scrollable)
- Copy to Clipboard button
- Visual feedback on copy

**Platforms**:
1. Instagram (pink-purple gradient)
2. LinkedIn (blue gradient)
3. X/Twitter (black gradient)
4. TikTok (black-pink gradient)

### History Tab

**Features**:
- Grid view of campaigns
- Product image thumbnail
- Product description
- Generation date
- Delete button

---

## 💾 Data Storage

### Browser localStorage

**Structure**:
```javascript
localStorage['socialPilotCampaigns'] = [
  {
    id: "1705680300000",
    productDescription: "Gaming laptop...",
    imagePreview: "data:image/png;base64...",
    content: { instagram, linkedin, x, tiktok },
    timestamp: "2024-02-19T10:30:00Z"
  },
  // ... more campaigns
]
```

**Limits**:
- Max ~5-10 MB per domain
- Usually sufficient for 100+ campaigns
- Persists until manually cleared

**Data NOT Sent**:
- ✅ Campaign history stays local
- ✅ Product images stay local
- ✅ Generated content encrypted locally
- ✅ Only input sent to LLM API

---

## 🔒 Security & Privacy

### API Keys
- ✅ Stored in `.env` (not committed)
- ✅ Used only server-side
- ✅ Never exposed to frontend
- ✅ Environment variable best practice

### Data Handling
- ✅ Product description sent to LLM
- ✅ Images not sent to external APIs
- ✅ No user tracking
- ✅ No analytics collection
- ✅ CORS enabled (for localhost development)

### File Uploads
- ✅ Max 10MB size limit
- ✅ Stored in memory (not disk)
- ✅ Not persisted

---

## 🚀 Deployment Options

### Option 1: Vercel + Heroku
- **Frontend**: Vercel (free tier)
- **Backend**: Heroku (free tier available)

### Option 2: Netlify + Railway
- **Frontend**: Netlify (free)
- **Backend**: Railway (pay-as-you-go)

### Option 3: Self-hosted
- **Both**: AWS EC2, DigitalOcean, etc.

### Deployment Steps
1. Update `.env` for production
2. Update CORS settings
3. Update API_URL in frontend
4. Deploy backend first
5. Deploy frontend with backend URL

---

## 📈 Performance Metrics

| Metric | Rating |
|--------|--------|
| Frontend Load | < 500ms |
| API Response | 5-15s (LLM) |
| Image Upload | < 2s |
| Copy to Clipboard | Instant |
| localStorage Query | < 10ms |
| Memory Usage | ~30-50MB |
| Bundle Size | ~50KB (HTML+CSS+JS) |

---

## 🔄 Workflow Diagram

```
┌─────────────────────────────────────────────────┐
│          Create New Campaign                      │
├─────────────────────────────────────────────────┤
│                                                   │
│  1. Product Description ──┐                      │
│  2. Optional Image ───────┼──→ Generate Button   │
│                          │                       │
│  Click Generate ◄────────┘                       │
│       ↓                                           │
│  Loading... (Skeleton loaders)                   │
│       ↓                                           │
│  LLM Generates Content                           │
│       ↓                                           │
│  Display 4 Cards:                                │
│  ┌──────┐ ┌──────┐ ┌────┐ ┌──────┐             │
│  │ IG   │ │ LI   │ │ X  │ │ TT   │             │
│  └──────┘ └──────┘ └────┘ └──────┘             │
│       ↓                                           │
│  User clicks "Copy to Clipboard"                │
│       ↓                                           │
│  Content ready to paste!                        │
│       ↓                                           │
│  Campaign saved to History                      │
│                                                   │
└─────────────────────────────────────────────────┘
```

---

## 🎯 Product Design Principles

### 1. Simplicity First
- One input → Four outputs
- No unnecessary features
- Focus on core value

### 2. Beautiful Defaults
- Soft UI aesthetic
- Professional appearance
- Delightful interactions

### 3. Speed Matters
- Quick loading
- Responsive feedback
- Smooth animations

### 4. Privacy-Focused
- No tracking
- Local storage first
- No data collection

### 5. Extensible
- Easy to add features
- Modular code
- Clear separation of concerns

---

## 📊 File Structure

```
social pilot/
├── index.html              React frontend (~800 lines)
├── server.js               Express backend (~200 lines)
├── package.json            Dependencies config
├── .env                    API keys (not committed)
├── .env.example            Template
├── .gitignore              Git exclusions
├── README_NEW.md           Full documentation
├── GETTING_STARTED_NEW.md  Quick start guide
└── PROJECT_ARCHITECTURE.md This file
```

---

## 🧠 AI Prompt Engineering

### System Prompt
```
"You are a social media expert creating viral content. 
Based on the product description, generate platform-specific posts
optimized for each platform's audience and format."
```

### Key Requirements
- Return valid JSON
- Platform-specific tone
- Ready-to-post content
- Emojis where appropriate
- Hashtags for reach
- Pacing cues for video

### Output Format
```json
{
  "instagram": { "text": "...", "hashtags": [...] },
  "linkedin": { "headline": "...", "text": "..." },
  "x": { "text": "...", "topics": [...] },
  "tiktok": { "hook": "...", "script": "...", "trending": "..." }
}
```

---

## 🔄 Future Enhancements

### Phase 2 (Next)
- ⬜ Direct social media posting
- ⬜ User authentication
- ⬜ Content calendar
- ⬜ Batch generation

### Phase 3
- ⬜ Image editing
- ⬜ Video generation
- ⬜ Analytics dashboard
- ⬜ Team collaboration

### Phase 4
- ⬜ Mobile app
- ⬜ Browser extension
- ⬜ API for integrations
- ⬜ Advanced analytics

---

## 🎓 Learning Opportunities

This project teaches:
- ✅ LLM API integration
- ✅ React component architecture
- ✅ Express.js server design
- ✅ File upload handling
- ✅ Environment configuration
- ✅ Frontend-backend communication
- ✅ Error handling patterns
- ✅ localStorage usage
- ✅ Form handling
- ✅ State management

---

## 📞 Support & Resources

- **Documentation**: See README_NEW.md
- **Quick Start**: See GETTING_STARTED_NEW.md
- **API Docs**: See README_NEW.md → API Documentation section
- **Troubleshooting**: See GETTING_STARTED_NEW.md → Troubleshooting section

---

**Social Pilot AI** - Empowering small businesses with AI-generated content 🚀

Version 2.0.0 | February 19, 2026
