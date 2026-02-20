# 🚀 Social Pilot AI - Quick Reference

## ⚡ Quick Start (Copy-Paste)

```bash
# Terminal:
cd "C:\Users\student\Desktop\social pilot"
npm install
npm start

# In browser:
file:///C:/Users/student/Desktop/social%20pilot/index.html
```

## 🔑 Get API Key (2 minutes)

### Gemini (FREE):
1. Go: https://ai.google.dev/tutorials/setup
2. Click: "Get API key"
3. Copy key
4. Paste in `.env`: `LLM_API_KEY=...`

### OpenAI (PAID):
1. Go: https://platform.openai.com/api-keys
2. Click: "Create new secret key"
3. Copy key
4. Paste in `.env`: `LLM_API_KEY=sk-...`

## 📝 Create `.env` File

**Content:**
```
PORT=5000
LLM_PROVIDER=gemini
LLM_API_KEY=YOUR_API_KEY_HERE
```

## 🎮 Using the App

1. Enter product description
2. (Optional) Upload image
3. Click "Generate"
4. Get 4 cards (Instagram, LinkedIn, X, TikTok)
5. Click "Copy" on any card
6. Paste into social media

## 📱 What You Get

| Platform | What's Included |
|----------|-----------------|
| Instagram | Caption + 15 hashtags + emojis |
| LinkedIn | Headline + 200-word professional post |
| X | Tweet under 280 chars + witty tone |
| TikTok | Hook + video script + trending sounds |

## 🛠️ File Reference

| File | Purpose |
|------|---------|
| `index.html` | Frontend (React) |
| `server.js` | Backend (Express) |
| `package.json` | Dependencies |
| `.env` | API keys (create this) |
| `.env.example` | Template |

## 📚 Documentation

| File | For |
|------|-----|
| `GETTING_STARTED_NEW.md` | First-time setup |
| `README_NEW.md` | Full features |
| `PROJECT_ARCHITECTURE.md` | Technical details |

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| "Port 5000 in use" | Change PORT in .env |
| "API key error" | Verify .env format, restart npm |
| "Can't connect" | Check npm start is running |
| "History empty" | Check browser localStorage |

## 🔗 API Rules

- **Endpoint**: `POST http://localhost:5000/api/generate`
- **Max image**: 10MB
- **Response time**: 5-15 seconds
- **Rate limits**: Depends on API provider

## 💡 Pro Tips

✅ Detailed descriptions = Better content  
✅ Use product images for context  
✅ Copy generated content as-is  
✅ History auto-saves (browser)  
✅ Try different products  

## 🔐 Security

- ✅ Never share `.env`
- ✅ API key stays server-side
- ✅ History only in browser
- ✅ No personal data collected

## 📊 Performance

- Frontend: < 500ms
- Generation: 5-15 seconds
- Copy: Instant

## ✅ Quick Checklist

- [ ] API key obtained
- [ ] `.env` created
- [ ] `npm install` done
- [ ] `npm start` running
- [ ] Browser shows dashboard
- [ ] Generated first post
- [ ] Copied to clipboard
- [ ] Viewed history

## 🎯 Common Commands

```bash
npm install        # Install dependencies
npm start          # Start server
npm run dev        # Start with auto-reload
Ctrl+C             # Stop server
```

## 🌐 Access URLs

- **Frontend**: `file:///C:/Users/student/Desktop/social%20pilot/index.html`
- **Backend Health**: `http://localhost:5000/api/health`
- **Backend API**: `http://localhost:5000/api/generate`

## 📞 Support

- **Setup issues**: Check GETTING_STARTED_NEW.md
- **API issues**: Check README_NEW.md
- **Code questions**: Check PROJECT_ARCHITECTURE.md
- **Browser console**: F12 for errors

---

**That's it! You're ready to generate amazing content! 🚀**
