# 📚 Bliz Social Pilot - File Reference Guide

## 🎯 Quick File Reference

### 📍 Start Here
| File | Purpose | Action |
|------|---------|--------|
| **GETTING_STARTED.md** | Step-by-step setup | Read this first |
| **README.md** | Full documentation | Learn features & APIs |
| **PROJECT_OVERVIEW.md** | Project summary | Understand architecture |

---

## 🔴 CRITICAL FILES (Don't Delete!)

### Frontend
| File | Type | Lines | Purpose |
|------|------|-------|---------|
| **index.html** | HTML/React | ~600 | Complete frontend app (single file!) |

### Backend
| File | Type | Lines | Purpose |
|------|------|-------|---------|
| **server.js** | Node.js | ~250 | Express server & all routes |
| **package.json** | Config | ~20 | Dependencies & scripts |

### Storage
| File | Type | Purpose |
|------|------|---------|
| **data/posts.json** | JSON | All posts stored here |

---

## 📂 Directory Structure Explained

```
social pilot/
│
├── Frontend App
│   └── index.html ⭐ MAIN FRONTEND
│
├── Backend Server
│   ├── server.js ⭐ MAIN BACKEND
│   └── package.json
│
├── Data Storage
│   └── data/
│       └── posts.json
│
├── Static Assets (Future)
│   └── public/
│
└── Documentation
    ├── GETTING_STARTED.md ⭐ START HERE
    ├── README.md
    ├── PROJECT_OVERVIEW.md
    └── FILE_REFERENCE.md (THIS FILE)

└── Configuration
    ├── .gitignore
    ├── .env.example
    ├── setup.bat (Windows)
    └── setup.sh (Mac/Linux)
```

---

## 📄 File Details

### 1️⃣ index.html (Frontend) ⭐
**Size**: ~600 lines  
**Type**: HTML + React JSX  
**Language**: HTML, JavaScript, React  
**Purpose**: Complete frontend application

**Key Components:**
- `<head>` - Tailwind CSS, React CDN, styles
- `<body>` - React root div + script tag
- React components:
  - `App` - Main container
  - `ComposePanel` - Post creation
  - `HistoryPanel` - Post listing
  - `ChatSidebar` - AI assistant

**To Edit:**
- Change API URL at line ~485
- Modify styles in `<style>` tag
- Add new components in JSX
- Update platform list ~220

**⚠️ Important**: 
- Uses CDN versions (React 18)
- Single file app
- No build process needed
- Just open in browser

---

### 2️⃣ server.js (Backend) ⭐
**Size**: ~250 lines  
**Type**: Node.js + Express  
**Language**: JavaScript (ES Module)  
**Purpose**: API server & automation

**Key Sections:**
- Imports & setup (1-20)
- Middleware (22-27)
- Helpers (29-48)
- AI function (50-80)
- Routes (82-180)
- Cron job (182-210)
- Health check (212-220)

**Main Routes:**
- `POST /api/post` - Publish now
- `POST /api/schedule` - Schedule
- `GET /api/history` - Get posts
- `POST /api/chat` - AI chat
- `DELETE /api/post/:id` - Delete

**To Edit:**
- Change PORT at line 8
- Modify cron schedule at line 182
- Update AI responses at line 50
- Add new routes after line 150

**⚠️ Important**:
- Run with `npm start`
- Keeps running (don't close terminal)
- Needs Node.js installed

---

### 3️⃣ package.json (Configuration)
**Size**: ~20 lines  
**Type**: JSON  
**Purpose**: Project metadata & dependencies

**Key Fields:**
- `name` - Project name
- `version` - Version number
- `main` - Entry point (server.js)
- `scripts` - Commands (start, dev)
- `dependencies` - Packages needed

**To Edit:**
```json
{
  "name": "my-project",
  "version": "2.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"  // Auto-restart
  }
}
```

**Dependencies Explained:**
- `express` - Web framework
- `cors` - Cross-origin requests
- `node-cron` - Scheduling
- `axios` - HTTP client

---

### 4️⃣ data/posts.json (Storage)
**Type**: JSON Array  
**Purpose**: Posts database  
**Auto-created**: Yes (on first run)

**Sample Post:**
```json
{
  "id": "1705680300000",
  "content": "Hello world!",
  "platform": "twitter",
  "status": "published",
  "timestamp": "2024-02-19T10:30:00Z",
  "postedAt": "2024-02-19T10:30:05Z"
}
```

**Scheduled Post Example:**
```json
{
  "id": "1705680400000",
  "content": "Future post",
  "platform": "linkedin",
  "status": "scheduled",
  "timestamp": "2024-02-19T10:35:00Z",
  "scheduledTime": "2024-02-20T14:00:00Z"
}
```

**⚠️ Important**:
- Manually edit with caution
- Always valid JSON
- Backup regularly
- Never delete file

---

### 5️⃣ GETTING_STARTED.md
**Purpose**: Step-by-step setup guide  
**Read Time**: 5 minutes  
**Audience**: First-time users

**Sections:**
- Setup steps (installation)
- Using the app
- Features explained
- Troubleshooting
- Next steps
- Customization ideas

**When to Read**: Before running app

---

### 6️⃣ README.md
**Purpose**: Complete documentation  
**Read Time**: 20 minutes  
**Audience**: Developers

**Sections:**
- Features overview
- Tech stack
- Installation
- API documentation
- How it works
- Troubleshooting
- Customization
- Future enhancements

**When to Read**: For detailed info

---

### 7️⃣ PROJECT_OVERVIEW.md
**Purpose**: Project summary  
**Read Time**: 15 minutes  
**Audience**: Project managers, developers

**Sections:**
- What's been built
- File structure
- Core components
- Technology stack
- Features breakdown
- Testing checklist
- Deployment options

**When to Read**: For big picture

---

### 8️⃣ .gitignore (Git Configuration)
**Size**: 6 lines  
**Purpose**: Exclude files from Git

**Contents:**
- `node_modules/` - Dependencies
- `data/posts.json` - Production data
- `.env` - Secrets
- `*.log` - Logs

**⚠️ Important**: Commit this file!

---

### 9️⃣ .env.example (Environment Template)
**Purpose**: Configuration template  
**Use**: Copy to `.env` when needed

**Fields:**
```
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=your_key_here
TWITTER_API_KEY=your_key_here
```

**⚠️ Important**:
- Don't commit actual `.env`
- Keep secrets private
- Use `.env.example` as template

---

### 🔟 setup.bat (Windows Setup Script)
**Purpose**: Automated setup  
**OS**: Windows only  
**Run**: Double-click or `.\setup.bat`

**Does:**
1. Checks Node.js installation
2. Installs npm dependencies
3. Shows startup instructions

**⚠️ Important**: Run from project folder

---

### 1️⃣1️⃣ setup.sh (Mac/Linux Setup Script)
**Purpose**: Automated setup  
**OS**: Mac/Linux  
**Run**: `bash setup.sh` or `./setup.sh`

**Does:**
1. Checks Node.js installation
2. Installs npm dependencies
3. Shows startup instructions

**⚠️ Important**: Make executable first

---

## 🔄 File Relationships

```
User opens browser
    ↓
Loads index.html (Frontend)
    ↓
React renders components
    ↓
User creates post
    ↓
Frontend sends request to:
    ↓
server.js (Backend)
    ↓
Server processes request
    ↓
Saves to data/posts.json
    ↓
Returns response to Frontend
    ↓
Frontend updates display
```

---

## 📝 Common Edits & Locations

### Add New Platform
**File**: `index.html`  
**Line**: ~220  
**Change**: Platform list in ComposePanel

### Change Server Port
**File**: `server.js`  
**Line**: 8  
**Change**: `const PORT = 5000;`

### Modify AI Responses
**File**: `server.js`  
**Line**: 50-80  
**Change**: generateAIResponse function

### Update Cron Schedule
**File**: `server.js`  
**Line**: 182  
**Change**: `cron.schedule('* * * * *',`

### Change Theme Colors
**File**: `index.html`  
**Line**: 15-30  
**Change**: CSS variables or classes

### Add New Route
**File**: `server.js`  
**Line**: 150+  
**Add**: `app.post('/api/newroute',`

---

## 🔍 File Search Guide

### "I want to find the API routes"
→ Open `server.js` and search for `app.post` and `app.get`

### "I want to change the chat responses"
→ Open `server.js` and find `generateAIResponse` function

### "I want to modify the UI"
→ Open `index.html` and look for className attributes

### "I want to add a new platform"
→ Open `index.html`, find platform array, add entry

### "I want to see all posts"
→ Open `data/posts.json`

### "I want to understand the structure"
→ Read `PROJECT_OVERVIEW.md`

---

## 🗂️ File Categories

### Configuration Files
- `package.json` - Dependencies
- `.env.example` - Environment
- `.gitignore` - Git ignore rules

### Source Code Files
- `index.html` - Frontend
- `server.js` - Backend

### Data Files
- `data/posts.json` - Posts storage

### Documentation Files
- `README.md` - Full docs
- `GETTING_STARTED.md` - Quick start
- `PROJECT_OVERVIEW.md` - Overview
- `FILE_REFERENCE.md` - This file

### Setup Files
- `setup.bat` - Windows setup
- `setup.sh` - Mac/Linux setup

### Directories
- `data/` - Data storage
- `public/` - Static assets (future)

---

## 🎯 By Use Case

### "I just cloned this project"
1. Read `GETTING_STARTED.md`
2. Run `setup.bat` (Windows) or `./setup.sh` (Mac/Linux)
3. Run `npm start`
4. Open `index.html`

### "I want to understand the code"
1. Read `PROJECT_OVERVIEW.md`
2. Open `index.html` and `server.js`
3. Search for specific functions
4. Read comments in code

### "I want to customize it"
1. Find relevant section in this file
2. Edit the appropriate file
3. Save and refresh browser
4. Test your changes

### "Something is broken"
1. Check `GETTING_STARTED.md` troubleshooting
2. Open browser console (F12)
3. Check backend terminal for errors
4. Review error messages

### "I want to deploy it"
1. Read `README.md` deployment section
2. Update `package.json` if needed
3. Configure environment variables
4. Deploy to hosting service

---

## 🔐 Sensitive Files

### ⚠️ NEVER commit these:
- `.env` (has secrets)
- `data/posts.json` (production data)
- `node_modules/` (too large)
- `*.log` (error logs)

### ✅ ALWAYS commit these:
- `.gitignore`
- `.env.example`
- `README.md`
- `package.json`
- `server.js`
- `index.html`

---

## 📊 File Statistics

| File | Size | Type | Version |
|------|------|------|---------|
| index.html | 20KB | React | 1.0 |
| server.js | 8KB | Node.js | 1.0 |
| package.json | 1KB | JSON | 1.0 |
| data/posts.json | < 1KB | JSON | N/A |
| README.md | 5KB | Markdown | 1.0 |
| GETTING_STARTED.md | 6KB | Markdown | 1.0 |

---

## 🚀 Next Steps

1. **First Time?** → Read `GETTING_STARTED.md`
2. **Want Details?** → Read `README.md`
3. **Want to Code?** → Open `index.html` and `server.js`
4. **Need Help?** → Check troubleshooting sections
5. **Ready to Deploy?** → Follow deployment guide

---

## 📞 Quick Reference

| Task | File | Line |
|------|------|------|
| Start backend | Terminal | `npm start` |
| Open frontend | Browser | Open `index.html` |
| View posts | File | `data/posts.json` |
| Change port | server.js | Line 8 |
| Add platform | index.html | Line 220 |
| Modify AI | server.js | Line 50 |
| Update styles | index.html | Line 15 |
| Change cron | server.js | Line 182 |

---

**Last Updated**: February 19, 2026  
**Version**: 1.0.0  
**Status**: ✅ Complete
