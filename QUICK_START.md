# 🚀 Quick Start Guide - Social Pilot AI

## Project Reorganization Complete! ✅

Your project has been split into organized frontend and backend folders.

---

## 📁 What You Have Now

```
social-pilot/
├── frontend/              ← All frontend code (React UI)
│   ├── index.html        ← Main HTML (clean, 40 lines)
│   ├── css/
│   │   └── styles.css    ← All styles
│   └── js/
│       ├── components/   ← 11 React component files
│       └── App.js        ← Main app
│
├── backend/              ← All backend code (API)
│   ├── config/           ← Configuration
│   ├── controllers/      ← Business logic
│   ├── middleware/       ← Error handling
│   └── routes/           ← API routes
│
├── server.js             ← Main server (updated)
├── package.json          ← Dependencies
└── .env                  ← Your API keys (create this!)
```

---

## ⚡ Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Setup Environment
```bash
# Copy the example file
copy .env.example .env

# Edit .env and add your API key:
# LLM_API_KEY=your_actual_api_key_here
```

### Step 3: Start Server
```bash
npm start
```

Then open: **http://localhost:5000**

---

## 🎯 What Changed?

| Before | After |
|--------|-------|
| 1 huge file (2175 lines) | 15+ organized files |
| Everything mixed together | Clean separation |
| Hard to maintain | Easy to maintain |

---

## 📂 File Locations

### Frontend Files
- **HTML**: `frontend/index.html`
- **CSS**: `frontend/css/styles.css`
- **Components**: `frontend/js/components/*.js`
- **Main App**: `frontend/js/App.js`

### Backend Files
- **Config**: `backend/config/index.js`
- **Routes**: `backend/routes/api.js`
- **Controllers**: `backend/controllers/contentController.js`
- **Middleware**: `backend/middleware/errorHandler.js`

### Main Entry
- **Server**: `server.js` (root folder)

---

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Start in development mode (auto-reload)
npm run dev

# Start in production mode
npm start

# Setup (install + copy .env)
npm run setup
```

---

## 🌐 URLs

- **Main App**: http://localhost:5000
- **Frontend Direct**: http://localhost:5000/frontend/index.html
- **API Health Check**: http://localhost:5000/api/health

---

## 📝 Environment Variables

Create a `.env` file in the root folder:

```env
# Server Port
PORT=5000

# LLM Provider (gemini or openai)
LLM_PROVIDER=gemini

# Your API Key (REQUIRED)
LLM_API_KEY=your_api_key_here
```

Get your API key from:
- **Gemini**: https://makersuite.google.com/app/apikey
- **OpenAI**: https://platform.openai.com/api-keys

---

## ❓ Troubleshooting

### Server won't start?
1. Make sure you ran `npm install`
2. Check that `.env` file exists with `LLM_API_KEY`
3. Make sure port 5000 is not in use

### Can't see the UI?
1. Check console for errors
2. Try: http://localhost:5000/frontend/index.html
3. Clear browser cache

### API not working?
1. Check `.env` has valid `LLM_API_KEY`
2. Visit http://localhost:5000/api/health
3. Check server console for errors

---

## 📚 Documentation

- `STRUCTURE.md` - Detailed structure documentation
- `REORGANIZATION_SUMMARY.md` - What changed
- `README.md` - Original README

---

## ✨ Next Steps

1. **Test it**: Run `npm start` and open http://localhost:5000
2. **Add API Key**: Edit `.env` with your LLM_API_KEY
3. **Create Content**: Try generating social media posts!

---

**Need Help?** Check `STRUCTURE.md` for detailed documentation.
