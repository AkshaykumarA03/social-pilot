# 🤖 Social Pilot AI

An AI-powered social media content generation MVP designed for small business owners. Create platform-optimized posts in seconds using cutting-edge LLM technology.

## ✨ Features

✅ **AI Content Generation** - Generate posts for 4 platforms instantly  
✅ **Smart Image Upload** - Drag-and-drop image uploader  
✅ **4 Platform Support** - Instagram, LinkedIn, X (Twitter), TikTok  
✅ **Platform-Specific Output**:
   - **Instagram**: Emojis, hashtags, visual copy
   - **LinkedIn**: Professional tone, thought leadership
   - **X**: Short, punchy, witty tweets
   - **TikTok**: Video scripts with hooks and trending suggestions
✅ **Copy to Clipboard** - One-click copying for each platform  
✅ **History & Storage** - localStorage saves all campaigns  
✅ **Soft UI Design** - Modern, beautiful interface  
✅ **Skeleton Loaders** - Smooth loading states  
✅ **Regenerate Content** - Create variations instantly  

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React 18 + Tailwind CSS |
| **Backend** | Node.js + Express |
| **LLM** | Google Gemini or OpenAI GPT-4o |
| **Storage** | localStorage (frontend) |
| **File Upload** | Multer |
| **Configuration** | dotenv |

## 📋 Prerequisites

- Node.js 14+
- npm or yarn
- Modern web browser
- API key from either:
  - **Google Gemini**: https://ai.google.dev/tutorials/setup
  - **OpenAI**: https://platform.openai.com/api-keys

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd "social pilot"
npm install
```

### 2. Set Up Environment
Create a `.env` file in the project root:

**For Google Gemini:**
```
PORT=5000
LLM_PROVIDER=gemini
LLM_API_KEY=your_gemini_api_key_here
```

**For OpenAI:**
```
PORT=5000
LLM_PROVIDER=openai
LLM_API_KEY=your_openai_api_key_here
```

### 3. Start the Backend
```bash
npm start
```

Expected output:
```
🚀 Social Pilot AI server running on http://localhost:5000
📡 LLM Provider: gemini
🔑 API Configured: Yes
```

### 4. Open Frontend
Open your browser to:
```
file:///C:/Users/student/Desktop/social%20pilot/index.html
```

## 📖 How to Use

### Create a Campaign
1. Go to the **Create Campaign** tab
2. Enter your product description (e.g., "Premium noise-cancelling Bluetooth headphones with 30-hour battery")
3. (Optional) Upload a product image via drag-and-drop
4. Click **Generate Content**

### Generated Output
You'll get 4 beautiful cards:

**📸 Instagram**
- Engaging copy with emojis
- Ready-to-copy hashtags
- Visual, relatable tone

**💼 LinkedIn**
- Professional headline
- Business-focused copy
- Thought leadership angle

**𝕏 X (Twitter)**
- Under 280 characters
- Witty and shareable
- Topic hashtags

**🎬 TikTok**
- Attention-grabbing hook
- Full video script with pacing cues
- Trending audio suggestions

### Copy & Use
- Click **Copy to Clipboard** on any card
- Paste directly into the platform
- Every post is already optimized!

### View History
Click the **History** tab to see all previous campaigns stored locally.

## 🔌 API Documentation

### POST /api/generate
Generate social media content for a product.

**Request:**
```javascript
POST http://localhost:5000/api/generate

Content-Type: multipart/form-data
- productDescription (text): Product or service description
- image (file, optional): Product image

Example with cURL:
curl -X POST http://localhost:5000/api/generate \
  -F "productDescription=Gaming laptop with RTX 4090" \
  -F "image=@product.jpg"
```

**Response:**
```json
{
  "success": true,
  "content": {
    "instagram": {
      "text": "🎮✨ Ultimate gaming power... [caption]",
      "hashtags": ["#GamingLaptop", "#RTX4090", ...]
    },
    "linkedin": {
      "headline": "Introducing Next-Gen Gaming Technology",
      "text": "In today's competitive gaming landscape..."
    },
    "x": {
      "text": "Just dropped the most powerful gaming laptop 🚀 #Gaming",
      "topics": ["#GamingPc", "#Tech"]
    },
    "tiktok": {
      "hook": "POV: Your gaming laptop just became 10x faster",
      "script": "[HOOK] [PAUSE 2sec] [ZOOM IN] Specs... [TEXT OVERLAY]",
      "trending": "Trending sound: 'Nobody' by Mitski"
    }
  },
  "timestamp": "2024-02-19T10:30:00Z"
}
```

### GET /api/health
Check server status and configuration.

**Request:**
```
GET http://localhost:5000/api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-02-19T10:30:00Z",
  "provider": "gemini",
  "configured": true
}
```

## 🎨 Design System

### Soft UI Aesthetic
- Rounded corners (rounded-2xl)
- Subtle shadows
- Clean white/gray/indigo palette
- Smooth transitions
- Gradient accents

### Color Palette
- **Primary**: Indigo (#4f46e5)
- **Background**: Light gray (#f8f9fc → #eef2ff)
- **Cards**: White (#ffffff)
- **Text**: Dark gray (#1f2937) to gray (#6b7280)

### Components
- Skeleton loaders during API calls
- Smooth fade-in animations
- Hover effects on cards
- Drag-and-drop image upload
- Copy feedback (button state change)

## 🔧 Configuration

### Environment Variables

```bash
# Server port (default: 5000)
PORT=5000

# Environment (development/production)
NODE_ENV=development

# LLM Provider selection
LLM_PROVIDER=gemini  # or 'openai'

# API Key for selected provider
LLM_API_KEY=your_api_key_here
```

### Changing LLM Provider

To switch from Gemini to OpenAI:

```bash
# Update .env
LLM_PROVIDER=openai
LLM_API_KEY=sk-...your-openai-key...
```

Then restart the server:
```bash
npm start
```

## 📱 Platform-Specific Output

### Instagram Strategy
- **Tone**: Casual, trendy, visual
- **Emojis**: Heavy use of relevant emojis
- **Hashtags**: 10-15 trending hashtags
- **Hook**: First line should stop the scroll

### LinkedIn Strategy
- **Tone**: Professional, insightful
- **Hook**: Business value proposition
- **Length**: 150-200 words
- **CTA**: Clear call-to-action

### X (Twitter) Strategy
- **Length**: Under 280 characters
- **Tone**: Witty, shareable, punchy
- **Emojis**: Strategic, not excessive
- **Engagement**: High retweet potential

### TikTok Strategy
- **Hook**: First 3 seconds must stop scroll
- **Script**: Includes pacing cues
- **Trending**: Audio/music suggestions
- **Format**: Video script with visual directions

## 💾 Data Storage

All campaigns are stored in **browser localStorage**:
- No external database needed
- No backend storage of history
- All data stays on your computer
- History persists across sessions
- Manual delete available in History tab

## 🚨 Troubleshooting

### "Cannot connect to backend"
```
❌ Make sure npm start is running in terminal
✅ Verify port 5000 is not in use
✅ Check no firewall is blocking it
```

### "LLM API error"
```
❌ Check if LLM_API_KEY is set in .env
✅ Verify API key is valid and not expired
✅ Check internet connection
✅ Review API provider dashboard for rate limits
```

### "Failed to generate content"
```
❌ Product description might be empty
✅ Try shorter product description (< 500 chars)
✅ Check browser console (F12) for errors
✅ Check backend terminal for detailed errors
```

### "Image not uploading"
```
❌ File size might be too large (max 10MB)
✅ Use common image formats (JPG, PNG, WebP)
✅ Try drag-and-drop instead of click
```

### "History not showing"
```
❌ localStorage might be disabled
✅ Check browser settings for localStorage
✅ Clear browser cache and reload
✅ Try a different browser
```

## 🎯 Example Use Cases

### E-commerce Store
**Input**: "Hand-poured soy candles with premium fragrance"
**Output**: 4 platform-specific posts ready to publish

### SaaS Product
**Input**: "AI-powered project management tool for teams"
**Output**: Professional LinkedIn, casual TikTok, punchy X, visual Instagram

### Local Service
**Input**: "Premium car detailing service in downtown area"
**Output**: Before/after Instagram, professional LinkedIn, witty X, TikTok demo

### Blog/Content Creator
**Input**: "New article about productivity hacks"
**Output**: Thoughtful LinkedIn, engaging TikTok script, catchy X, hashtag Instagram post

## 🔐 API Key Security

### Best Practices
- ✅ Never commit `.env` file
- ✅ Use `.env.example` as template
- ✅ Keep API keys private
- ✅ Rotate keys regularly
- ✅ Use environment variables for production

### Getting API Keys

**Google Gemini:**
1. Visit https://ai.google.dev/tutorials/setup
2. Click "Get API key"
3. Create new API key
4. Copy and paste into `.env`

**OpenAI:**
1. Visit https://platform.openai.com/api-keys
2. Create new secret key
3. Copy and paste into `.env`
4. Keep it secure!

## 📊 Performance

- **Frontend load**: < 500ms
- **API response**: 5-15 seconds (LLM processing)
- **Image upload**: < 2 seconds
- **localStorage**: Instant
- **Memory usage**: ~30-50MB

## 🚀 Production Deployment

To deploy Social Pilot AI:

1. **Backend**: Deploy to Heroku, Railway, Render, or cloud provider
   ```bash
   git push heroku main
   # or appropriate deployment command
   ```

2. **Frontend**: Deploy to Vercel, Netlify, or GitHub Pages
   - Build as static HTML/CSS/JS
   - Update API_URL to production backend

3. **Environment**: Set `.env` variables on hosting platform

4. **CORS**: Update CORS settings for production domain

## 🛣️ Future Roadmap

- [ ] Real social media API integration (post directly)
- [ ] User authentication & multi-user support
- [ ] Database instead of localStorage
- [ ] Image editing before posting
- [ ] Batch generation (multiple posts at once)
- [ ] Analytics dashboard
- [ ] Content calendar
- [ ] Team collaboration
- [ ] Mobile app
- [ ] Browser extension

## 📝 Project Structure

```
social pilot/
├── index.html              Frontend (React)
├── server.js               Backend (Express)
├── package.json            Dependencies
├── README.md               Documentation
├── .env.example            Configuration template
├── .env                    Actual config (not committed)
└── data/                   (for future uploads)
```

## 🎓 What You'll Learn

- LLM integration patterns
- Streaming API responses
- React component architecture
- Backend API design
- File upload handling
- Environment configuration
- Error handling & validation

## 📄 License

MIT

## 💬 Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console (F12) for errors
3. Check backend terminal for detailed logs
4. Verify API key and internet connection

---

**Made with ❤️ for creators and small business owners**

V2.0.0 | February 19, 2026
