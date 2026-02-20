# 🚀 Social Pilot AI - Getting Started

Welcome! This guide will get you up and running in **5 minutes**.

## ⚡ Quick Setup (TL;DR)

```powershell
# 1. Install dependencies
npm install

# 2. Create .env file with your API key
# Add: LLM_API_KEY=your_gemini_or_openai_key_here

# 3. Start backend
npm start

# 4. Open browser
file:///C:/Users/student/Desktop/social%20pilot/index.html
```

---

## 📋 Prerequisites

- Node.js 14+ (check: `node --version`)
- npm installed (usually with Node.js)
- One API key from:
  - **Google Gemini** (free tier available): https://ai.google.dev
  - **OpenAI GPT-4o**: https://platform.openai.com

## 🔑 Get Your API Key

### Option 1: Google Gemini (Recommended - Free tier!)

1. Go to https://ai.google.dev/tutorials/setup
2. Click **"Get API key"**
3. Select/create a Google Cloud project
4. Copy the API key
5. Paste into `.env` file (see below)

### Option 2: OpenAI GPT-4o

1. Go to https://platform.openai.com/api-keys
2. Click **"Create new secret key"**
3. Copy the key (starts with `sk-`)
4. Paste into `.env` file

---

## 📦 Step 1: Install Dependencies

Open PowerShell and navigate to the project:

```powershell
cd "C:\Users\student\Desktop\social pilot"
npm install
```

You should see packages being installed:
```
npm notice created a lockfile as package-lock.json
added 50 packages in 10s
```

---

## 🔐 Step 2: Create `.env` File

Create a file named `.env` in the project root folder with your API key.

### For Gemini:
```
PORT=5000
NODE_ENV=development
LLM_PROVIDER=gemini
LLM_API_KEY=AIzaSyD...your_gemini_key_here...
```

### For OpenAI:
```
PORT=5000
NODE_ENV=development
LLM_PROVIDER=openai
LLM_API_KEY=sk-...your_openai_key_here...
```

**Save the file** and close it.

---

## 🎯 Step 3: Start the Backend Server

In PowerShell, run:

```powershell
npm start
```

Expected output:
```
🚀 Social Pilot AI server running on http://localhost:5000
📡 LLM Provider: gemini
🔑 API Configured: Yes
```

**🟢 Keep this terminal open!** The server must keep running.

---

## 🌐 Step 4: Open the Frontend

Open your web browser to:

```
file:///C:/Users/student/Desktop/social%20pilot/index.html
```

You should see the **Social Pilot AI** dashboard!

---

## 🎮 Try It Out!

### First Campaign
1. Enter: `"Sustainable bamboo water bottle with premium design"`
2. (Optional) Upload a product image
3. Click **Generate Content**
4. ⏳ Wait 5-15 seconds for AI to generate
5. 📸 Get 4 platform-specific posts!

### Copy to Social Media
1. Click **Instagram** card
2. Click **Copy to Clipboard**
3. Paste directly into Instagram caption
4. Repeat for other platforms!

### View History
1. Click **History** tab in sidebar
2. See all your previous campaigns
3. Delete unwanted campaigns

---

## 📱 Understanding the Output

### Instagram Card 🎨
- **Full engagement-optimized post**
- Emojis, hashtags, visual language
- Perfect for visual storytelling

### LinkedIn Card 💼
- **Professional headline + body**
- Business value focus
- Thought leadership angle

### X Card 𝕏
- **Under 280 characters**
- Witty and shareable
- Hashtags for reach

### TikTok Card 🎬
- **Hook** (first 3 seconds)
- **Script** with pacing cues
- **Trending** audio suggestions

---

## 🐛 Troubleshooting

### Backend won't start

**Error: "Port 5000 in use"**
```
Solution: Another app is using port 5000
Option 1: Close the other app
Option 2: Change PORT in .env to 5001
```

**Error: "Cannot find module"**
```
Solution: Run npm install again
npm install
```

### Can't connect to backend

**Browser shows "connection refused"**
```
Steps:
1. Check npm start is running
2. Check browser console (F12)
3. Verify port is 5000
4. Try: http://localhost:5000/api/health
```

### "LLM API error"

**Error: "401 Unauthorized" or "API key error"**
```
Solution:
1. Verify API key is correct in .env
2. Check you copied the ENTIRE key
3. Restart server after changing .env
4. Check API key isn't expired
```

**Error: "Rate limit exceeded"**
```
Solution:
- Gmail API: Limited free requests/day
- OpenAI: Check usage limits
- Try again in a few minutes
```

### AI not generating good content

**Problem: Posts seem generic**
```
Solution:
- Be more specific in product description
- Add more details (features, benefits)
- Include target audience info
- Example GOOD: "Premium wireless earbuds with 12-hour battery, active noise cancellation, and marble white case for Gen Z"
```

### History not saving

**Problem: History appears empty**
```
Solution:
1. Check browser localStorage is enabled
2. Try different browser
3. Clear browser cache
4. Campaigns are saved in browser, not backend
```

---

## ⌨️ Command Reference

| Command | What it does |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm start` | Start backend server |
| `npm run dev` | Start with auto-restart on changes |

---

## 🎯 Next Steps

### After First Success:
1. ✅ Create multiple campaigns
2. ✅ Try different product types
3. ✅ Test Instagram, LinkedIn, X, TikTok
4. ✅ Copy posts to actual social media
5. ✅ Check History tab

### Advanced:
- Read [README_NEW.md](README_NEW.md) for full documentation
- Explore API endpoints
- Customize LLM prompts (edit `server.js`)
- Deploy to production

---

## 📊 What Happens Behind the Scenes

```
User enters: "Gaming laptop with RTX 4090"
        ↓
Frontend sends to: POST /api/generate
        ↓
Backend receives request
        ↓
Backend sends to: Google Gemini API (or OpenAI)
        ↓
LLM generates custom content for:
  - Instagram (emojis + hashtags)
  - LinkedIn (professional tone)
  - X (short + witty)
  - TikTok (video script)
        ↓
Backend returns JSON response
        ↓
Frontend displays 4 beautiful cards
        ↓
User clicks "Copy to Clipboard"
        ↓
Ready to paste into social media!
```

---

## 🔐 Security Notes

- ✅ Your API key is in `.env` (never committed to git)
- ✅ All history stored locally in browser
- ✅ No data sent to external servers (except LLM API)
- ✅ Keep `.env` file private
- ✅ Don't share your API key

---

## 💡 Pro Tips

**Tip 1: Better prompts = Better content**
- ❌ "Coffee mug"
- ✅ "Premium ceramic coffee mug with bamboo lid, keeps drinks hot for 6 hours, eco-friendly"

**Tip 2: Use images for context**
- AI generates better content when it sees your product
- Upload your best product photo

**Tip 3: Copy and modify**
- Generate once, get 4 versions
- Use as starting point and customize further

**Tip 4: Test different products**
- Campaigns stored locally
- Easy to regenerate anytime

---

## ✅ Success Checklist

- [ ] Node.js installed
- [ ] npm install completed
- [ ] `.env` file created with API key
- [ ] npm start running (no errors)
- [ ] Browser shows dashboard
- [ ] Generated at least 1 campaign
- [ ] Copied content to clipboard
- [ ] Viewed History tab

✨ **You're all set! Start creating amazing content!** ✨

---

## 📞 Need Help?

1. Check troubleshooting section above
2. Review browser console (F12 → Console tab)
3. Check backend terminal for error messages
4. Verify `.env` file format
5. Restart server after changes

---

**Version**: 2.0.0  
**Created**: February 19, 2026  
**Status**: ✅ Ready to Use
