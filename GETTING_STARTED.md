# Getting Started with Bliz Social Pilot

## 📋 Step-by-Step Setup

### Step 1: Open Terminal/PowerShell
Navigate to the project directory:
```powershell
cd "C:\Users\student\Desktop\social pilot"
```

### Step 2: Install Dependencies
```powershell
npm install
```

This will install:
- `express` - Web framework
- `cors` - For cross-origin requests
- `node-cron` - For scheduling
- `axios` - HTTP client

### Step 3: Start the Backend Server
```powershell
npm start
```

You should see:
```
🚀 Bliz Social Pilot server running on http://localhost:5000
```

**Don't close this terminal!** The server needs to keep running.

### Step 4: Open the Frontend
Open a new browser tab and go to:
```
file:///C:/Users/student/Desktop/social%20pilot/index.html
```

You should see the Bliz Social Pilot dashboard!

---

## 🎮 Using the Application

### Composing a Post

1. **Go to the "Compose" tab**
2. **Write your content** in the text area
3. **Select a platform**: X (Twitter), LinkedIn, or Facebook
4. **Choose posting method**:
   - **Post Now**: Publishes immediately
   - **Schedule**: Set a date/time for automatic publishing
5. **Click the button** to post or schedule

### Viewing History

1. **Click the "History" tab**
2. **Filter posts** by status (All, Published, Scheduled)
3. **Click "Refresh"** to update the list
4. **Delete posts** using the trash icon

### Using the AI Assistant

1. **Look at the right sidebar** (Chat panel)
2. **Type a message** like:
   - "post ideas for a tech product"
   - "optimize this caption"
   - "content strategy for LinkedIn"
3. **Press Enter or click Send**
4. **Get AI suggestions** instantly!

---

## ✨ Features Explained

### Post Now
- Content is published immediately
- Status: Published
- Appears in history with publication timestamp

### Schedule
- Content is saved with a future date/time
- Waiting in queue until scheduled time
- Status: Scheduled
- When time arrives, automatically becomes "Published"
- Backend checks every minute (cron job)

### History Tab
- Shows ALL posts (past, present, scheduled)
- Color-coded status badges
- Shows platform, content, timestamps
- Ability to delete posts

### Chat Sidebar
- AI-powered suggestions
- Context-aware responses
- Try asking:
  - "What should I post about?"
  - "How do I optimize captions?"
  - "Content ideas"
  - "Social media tips"

---

## 🔍 Technical Details

### Storage
- All posts stored in `data/posts.json`
- Each post has:
  - Unique ID (timestamp)
  - Content and platform
  - Status (published/scheduled)
  - Timestamps

### Automation
- Backend runs cron every 60 seconds
- Checks for scheduled posts
- Updates status when time passes
- Logs actions to console

### API Calls (simulated)
- Real posts would call actual APIs
- Currently simulates responses
- Can integrate with real platforms

---

## 🛠️ Troubleshooting

### "Cannot GET /api/history" Error
**Solution**: Make sure the backend server is running on port 5000
```powershell
npm start
```

### Posts Not Saving
**Solution**: Check that `data/` folder exists and has write permissions

### Scheduled Posts Not Publishing
**Solution**: 
1. Check system time is correct
2. Backend needs to keep running
3. Check browser console for errors (F12)
4. Check terminal for backend logs

### Frontend Not Loading
**Solution**: Use correct file path with URL encoding:
```
file:///C:/Users/student/Desktop/social%20pilot/index.html
```

---

## 🚀 Next Steps

1. **Test Post Now**: Create a quick post
2. **Test Schedule**: Schedule a post 5 minutes from now
3. **Use Chat**: Ask for post ideas
4. **Check History**: See all your posts
5. **Explore**: Try different platforms

---

## 📊 What's Happening Behind the Scenes

```
User clicks "Post Now"
    ↓
Browser sends POST request to http://localhost:5000/api/post
    ↓
Backend receives request, validates data
    ↓
Simulates social media API call (in production: real API)
    ↓
Saves post to data/posts.json
    ↓
Returns success response to browser
    ↓
Browser updates UI, shows confirmation
    ↓
Post appears in History tab
```

---

## 💾 Where Data is Stored

- **Backend data**: `data/posts.json` (JSON file)
- **Frontend data**: Browser's LocalStorage (client-side)
- **No external database needed!**

---

## 🎨 Customization Ideas

### Add More Platforms
Edit `index.html` line ~220 in ComposePanel:
```javascript
{ id: 'tiktok', label: 'TikTok', icon: 'fab fa-tiktok' },
{ id: 'instagram', label: 'Instagram', icon: 'fab fa-instagram' },
```

### Change Colors
Modify Tailwind CSS classes in `index.html`:
```html
<!-- Change from blue (blue-600) to green (emerald-600) -->
<button className="bg-emerald-600">...</button>
```

### Connect Real AI API
Edit `server.js` in the `generateAIResponse` function:
```javascript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  // Real API call here
});
```

---

## 📈 Performance Tips

1. **Regular cleanup**: Delete old posts from history
2. **Batch operations**: Schedule posts during off-hours
3. **Monitor memory**: Keep eye on `data/posts.json` size
4. **Restart server**: Occasionally restart backend for fresh state

---

## 🎯 Common Workflows

### Morning Social Media Schedule
1. Open Bliz Social Pilot
2. Compose 3-5 posts
3. Schedule them for 9 AM, 12 PM, 3 PM, 6 PM
4. Come back later to check History
5. No manual posting needed!

### Weekly Content Plan
1. Use Chat sidebar for ideas
2. Compose multiple posts
3. Schedule for entire week
4. Let automation handle posting
5. Review in History

### Quick Share
1. Write post immediately
2. Click "Post Now"
3. Done! Appears in History

---

## ❓ FAQ

**Q: Can I post to real platforms?**
A: Currently simulated. To use real platforms, integrate their official APIs (Twitter API, LinkedIn API, etc.)

**Q: How often does scheduling check?**
A: Every 60 seconds (can change in `server.js`)

**Q: Can multiple people use this?**
A: Currently single-user. For multi-user, add authentication and database.

**Q: Is my data safe?**
A: Data stored locally in JSON files. Backup regularly!

**Q: Can I run this online?**
A: Yes! Deploy to Heroku, Railway, or cloud provider with Node.js support.

---

## 🎉 You're All Set!

Your Bliz Social Pilot is ready to go. Happy automating! 🚀

For more help, check `README.md`
