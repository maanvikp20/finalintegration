# 🚀 QUICK START - MongoDB Version

## 📋 Prerequisites Checklist

- [ ] Node.js installed
- [ ] MongoDB installed OR MongoDB Atlas account

---

## Step 1: Install MongoDB

### Option A: Local MongoDB (Recommended for learning)

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
1. Download: https://www.mongodb.com/try/download/community
2. Run installer
3. MongoDB starts automatically

**Linux (Ubuntu):**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Verify it's running:**
```bash
mongosh
# You should see MongoDB shell
```

### Option B: MongoDB Atlas (Cloud - FREE)
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create FREE account
3. Create cluster (choose FREE tier)
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Create `server/.env` file:
   ```
   MONGODB_URI=your_connection_string_here
   ```

---

## Step 2: Install Project Dependencies

```bash
# Terminal 1 - Backend
cd book-review-app/server
npm install

# Terminal 2 - Frontend  
cd book-review-app/client
npm install
```

---

## Step 3: Start Everything!

### Terminal 1 - Start Backend
```bash
cd server
npm start
```

**You should see:**
```
✅ MongoDB Connected: localhost
✅ Server is running on http://localhost:5000
🔐 Auth API available at http://localhost:5000/api/auth
📚 Books API available at http://localhost:5000/api/books
💾 Database: MongoDB
```

### Terminal 2 - Start Frontend
```bash
cd client
npm start
```

**Browser auto-opens to:** http://localhost:3000

---

## Step 4: Create Account & Test!

1. **Register:**
   - Click "Register here"
   - Username: testuser
   - Email: test@example.com
   - Password: password123
   - Click "Register"

2. **Add Book:**
   - Click "+ Add New Review"
   - Fill in book details
   - Click "Add Review"

3. **Verify MongoDB:**
   ```bash
   mongosh
   use book-review-app
   db.users.find()
   db.books.find()
   ```
   You should see your data!

---

## 🎯 What's Different?

### vs Previous Version:

| Feature | Before | Now |
|---------|--------|-----|
| Database | In-memory | **MongoDB** |
| Data Persistence | ❌ Lost on restart | ✅ **Saved permanently** |
| File Structure | hooks/, context/, services/ | ✅ **Just components/** |
| API Calls | Service layer | ✅ **Direct in components** |
| State Management | Context API | ✅ **Direct in App.js** |

---

## 📁 Simplified Structure

```
client/src/
├── components/          ← Everything here!
│   ├── Login.js
│   ├── Register.js
│   ├── BookCard.js
│   ├── BookList.js
│   ├── BookForm.js
│   ├── UserStats.js
│   ├── Loading.js
│   ├── ErrorDisplay.js
│   └── (CSS files)
├── App.js              ← State management
├── index.js
└── (CSS files)
```

**No separate folders for:**
- ❌ hooks/
- ❌ context/
- ❌ services/

**Everything is in components/ !**

---

## ✅ Features to Test

### 1. User Authentication
- ✅ Register new account → Saved to MongoDB!
- ✅ Login with credentials → Retrieved from MongoDB!
- ✅ Logout → Clear session
- ✅ Auto-login on return → localStorage + MongoDB

### 2. Book Reviews (CRUD)
- ✅ **Create** - Add book → Saves to MongoDB
- ✅ **Read** - View books → Loads from MongoDB
- ✅ **Update** - Edit book → Updates MongoDB
- ✅ **Delete** - Remove book → Deletes from MongoDB

### 3. Statistics
- ✅ Total books → Calculated from MongoDB
- ✅ Average rating → Calculated from MongoDB
- ✅ Highest rated → Query MongoDB
- ✅ Recent review → Query MongoDB

---

## 🐛 Common Issues

### "MongoDB connection error"
**Solution:**
```bash
# Check MongoDB is running:
brew services list  # macOS
# OR
sudo systemctl status mongod  # Linux

# Start if not running:
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux
```

### "Module not found"
**Solution:**
```bash
cd server && npm install
cd client && npm install
```

### "Port 5000 already in use"
**Solution:**
```bash
# Kill process on port 5000
npx kill-port 5000
# Then restart server
npm start
```

---

## 📊 MongoDB Commands (Useful!)

```bash
# Open MongoDB shell
mongosh

# Switch to your database
use book-review-app

# View all users
db.users.find().pretty()

# View all books
db.books.find().pretty()

# Count users
db.users.countDocuments()

# Count books
db.books.countDocuments()

# Delete all data (if you want to start fresh)
db.users.deleteMany({})
db.books.deleteMany({})

# Exit
exit
```

---

## 🎨 Where API Calls Are

**No service files! API calls are directly in components:**

- `Login.js` → Line ~25: `fetch('/api/auth/login')`
- `Register.js` → Line ~30: `fetch('/api/auth/register')`
- `BookForm.js` → Line ~55: `fetch('/api/books')` (create)
- `BookForm.js` → Line ~57: `fetch('/api/books/:id')` (update)
- `BookCard.js` → Line ~12: `fetch('/api/books/:id')` (delete)
- `UserStats.js` → Line ~15: `fetch('/api/books/stats/:userId')`
- `App.js` → Line ~45: `fetch('/api/books?userId=...')` (load)

**This makes it easy to:**
- ✅ See where each API call happens
- ✅ Debug network issues
- ✅ Understand data flow
- ✅ Modify requests

---

## 🎯 Assignment Checklist

### Original Requirements (50/50):
- [x] GET request (App.js useEffect)
- [x] Display with .map() (BookList.js)
- [x] 5+ fields (title, author, rating, review, date)
- [x] Loading state (Loading.js)
- [x] Error state (ErrorDisplay.js)
- [x] POST - Add books (BookForm.js)
- [x] PUT - Edit books (BookForm.js)
- [x] DELETE - Remove books (BookCard.js)

### BONUS Features:
- [x] MongoDB database (persistent!)
- [x] User authentication
- [x] User statistics
- [x] Simplified structure (components only)
- [x] Direct API calls (no abstraction)

**Total: 50/50 + Bonuses!** 🎉

---

## 🚀 Next Steps

1. **Add more books** - Test CRUD operations
2. **Check MongoDB** - See data persistence
3. **Restart server** - Data still there!
4. **Create another user** - Test multi-user
5. **Customize** - Add your own features!

---

## 💡 Tips

- **MongoDB Compass** - Download GUI to view database visually
- **Postman** - Test API endpoints directly
- **Browser DevTools** - Network tab to see all requests
- **VS Code** - MongoDB extension for database access

---

## 🎉 You're Ready!

Your app now has:
- ✅ Real database (MongoDB)
- ✅ Persistent storage
- ✅ User authentication
- ✅ Simplified structure
- ✅ All CRUD operations
- ✅ Production-ready architecture

**Happy Coding!** 📚✨

---

**Database**: MongoDB (local or Atlas)  
**Structure**: Simplified (components only)  
**Storage**: Permanent (not in-memory)
