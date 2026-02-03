# 📚 Book Review App - Full Stack with MongoDB

A complete full-stack application for managing book reviews with user authentication and MongoDB database.

## 💾 Database: MongoDB

This app uses **MongoDB** for persistent data storage. All user accounts and book reviews are saved to the database.

---

## 🚀 Quick Start

### Prerequisites
1. **Node.js** (v14 or higher)
2. **MongoDB** - You need MongoDB running locally OR a MongoDB Atlas account

### MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB Community Edition: https://www.mongodb.com/try/download/community
2. Start MongoDB:
   ```bash
   # On macOS:
   brew services start mongodb-community

   # On Windows:
   # MongoDB should start automatically after installation

   # On Linux:
   sudo systemctl start mongod
   ```
3. Verify it's running:
   ```bash
   mongosh
   # You should see MongoDB shell
   ```

#### Option B: MongoDB Atlas (Cloud - FREE)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (FREE tier available)
4. Click "Connect" → "Connect your application"
5. Copy your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Create `.env` file in `server/` folder:
   ```
   MONGODB_URI=your_connection_string_here
   ```

---

## 📁 Project Structure

### Simplified Frontend (No hooks/context/services folders!)
```
client/
└── src/
    ├── components/          ← ALL components here
    │   ├── Login.js
    │   ├── Register.js
    │   ├── BookCard.js
    │   ├── BookList.js
    │   ├── BookForm.js
    │   ├── UserStats.js
    │   ├── Loading.js
    │   ├── ErrorDisplay.js
    │   └── *.css files
    ├── App.js              ← Main app with state management
    ├── App.css
    ├── index.js
    └── index.css
```

**Key Features:**
- ✅ All API calls directly in components
- ✅ All state in App.js (no Context API)
- ✅ No separate hooks/services/context folders
- ✅ Simple, straightforward structure

### Backend with MongoDB
```
server/
├── config/
│   └── database.js         ← MongoDB connection
├── models/
│   ├── User.js            ← Mongoose User schema
│   └── Book.js            ← Mongoose Book schema
├── controllers/
│   ├── authController.js
│   └── bookController.js
├── routes/
│   ├── authRoutes.js
│   └── bookRoutes.js
├── server.js
├── package.json
└── .env.example
```

---

## 🔧 Installation

### Step 1: Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### Step 2: Configure MongoDB

**For Local MongoDB:**
- No configuration needed! It connects to `mongodb://localhost:27017/book-review-app` by default

**For MongoDB Atlas:**
1. Create `server/.env` file:
   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/book-review-app
   ```

### Step 3: Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

You should see:
```
✅ MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
✅ Server is running on http://localhost:5000
🔐 Auth API available at http://localhost:5000/api/auth
📚 Books API available at http://localhost:5000/api/books
💾 Database: MongoDB
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

Browser opens to http://localhost:3000

---

## 🎯 Features

### User Authentication
- ✅ **Register** - Create account (saved to MongoDB)
- ✅ **Login** - Authenticate with database
- ✅ **Session Persistence** - Stay logged in
- ✅ **Logout** - Secure sign out

### Book Reviews (CRUD)
- ✅ **Create** (POST) - Add book reviews to MongoDB
- ✅ **Read** (GET) - Load your reviews from MongoDB
- ✅ **Update** (PUT) - Edit reviews in MongoDB
- ✅ **Delete** - Remove reviews from MongoDB

### User Features
- ✅ **Personal Library** - Each user has their own reviews
- ✅ **Statistics Dashboard** - Reading stats calculated from MongoDB
- ✅ **Data Persistence** - Everything saves to database!

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Create user account
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile/:userId` - Get user profile
- `PUT /api/auth/profile/:userId` - Update profile

### Books
- `GET /api/books?userId=xxx` - Get user's books
- `POST /api/books` - Create book review
- `PUT /api/books/:id` - Update book review
- `DELETE /api/books/:id?userId=xxx` - Delete book review
- `GET /api/books/stats/:userId` - Get user statistics

---

## 🏗️ Technical Details

### MongoDB Models

**User Schema:**
```javascript
{
  username: String (unique, min 3 chars),
  email: String (unique, valid email),
  password: String (min 6 chars),
  timestamps: true
}
```

**Book Schema:**
```javascript
{
  userId: ObjectId (ref: User),
  title: String,
  author: String,
  rating: Number (1-5),
  review: String,
  timestamps: true
}
```

### Database Features
- ✅ **Mongoose ODM** for schema validation
- ✅ **Auto-generated IDs** (_id field)
- ✅ **Timestamps** (createdAt, updatedAt)
- ✅ **Relationships** (userId references User)
- ✅ **Validation** (required fields, min/max values)

---

## 🎓 How It Works

### Data Flow (Simplified - No Extra Folders!)

**Login:**
```
Login.js → Fetch API → Server → MongoDB
           ↓
    localStorage + App.js state
           ↓
    Show Dashboard
```

**Add Book:**
```
BookForm.js → Fetch API → Server → MongoDB
                ↓
        App.js updates state
                ↓
        BookList re-renders
```

**All API calls are directly in components:**
- `Login.js` - Has fetch call to `/api/auth/login`
- `Register.js` - Has fetch call to `/api/auth/register`
- `BookForm.js` - Has fetch calls for create/update
- `BookCard.js` - Has fetch call for delete
- `UserStats.js` - Has fetch call for stats
- `App.js` - Has fetch call for loading books

**No separate service files needed!**

---

## ✅ Assignment Requirements Met

1. ✅ **Fetch Data** - GET request with useEffect in App.js
2. ✅ **Display Dynamically** - Multiple components with .map()
3. ✅ **Loading/Error States** - Loading and ErrorDisplay components
4. ✅ **Full CRUD** - POST, GET, PUT, DELETE all implemented

**BONUS:**
- ✅ User authentication system
- ✅ MongoDB database (persistent storage!)
- ✅ User statistics
- ✅ Simplified structure (no extra folders)

---

## 🧪 Testing

### Create Account:
1. Click "Register here"
2. Enter:
   - Username: testuser
   - Email: test@example.com
   - Password: password123
3. Auto-logged in!
4. Check MongoDB - user is saved!

### Add Book:
1. Click "+ Add New Review"
2. Fill in book details
3. Click "Add Review"
4. Check MongoDB - book is saved!

### Check MongoDB Data:
```bash
mongosh
use book-review-app
db.users.find().pretty()
db.books.find().pretty()
```

---

## 🐛 Troubleshooting

**"MongoServerError: connect ECONNREFUSED"**
- MongoDB is not running
- Start MongoDB: `brew services start mongodb-community` (macOS)
- Or check MongoDB Atlas connection string

**"ValidationError: User validation failed"**
- Check required fields (username, email, password)
- Username must be 3+ chars
- Password must be 6+ chars

**Books not loading?**
- Check browser console for errors
- Verify MongoDB connection in server terminal
- Make sure you're logged in

**Data not persisting?**
- Check MongoDB is running
- Verify connection string if using Atlas
- Check server logs for database errors

---

## 📊 MongoDB vs In-Memory

| Feature | In-Memory (Old) | MongoDB (New) |
|---------|----------------|---------------|
| Data Persistence | ❌ Resets on restart | ✅ Permanent storage |
| User Accounts | ❌ Lost on restart | ✅ Saved in database |
| Book Reviews | ❌ Lost on restart | ✅ Saved in database |
| Multiple Sessions | ❌ Same data | ✅ Each user separate |
| Production Ready | ❌ No | ✅ Yes |

---

## 🎨 Code Structure Highlights

### Simplified Architecture:
- **No Context API** - State in App.js
- **No Custom Hooks** - useEffect in components
- **No Service Layer** - Fetch directly in components
- **Single components/ folder** - Everything in one place

### Benefits:
- ✅ **Easier to understand** - Less abstraction
- ✅ **Easier to debug** - See where API calls are
- ✅ **Easier to modify** - All logic in one file
- ✅ **Less boilerplate** - No extra files

### Example (BookCard.js):
```javascript
// API call directly in component
const handleDelete = async () => {
  const response = await fetch(`${API_URL}/${book._id}?userId=${userId}`, {
    method: 'DELETE',
  });
  // Handle response
};
```

---

## 🚀 Future Enhancements

- [ ] Password hashing (bcrypt)
- [ ] JWT authentication
- [ ] Email verification
- [ ] Password reset
- [ ] Book cover images
- [ ] Search/filter books
- [ ] Export to PDF
- [ ] Social features

---

## 📝 Notes

- **Security**: In production, use bcrypt for passwords and JWT for auth
- **Database**: MongoDB stores all data permanently
- **Structure**: Simplified - no hooks/context/services folders
- **API Calls**: Direct fetch() in components

---

## 📄 License

Educational project for learning purposes.

---

**Stack**: React + Node.js + Express + MongoDB + Mongoose  
**Database**: MongoDB (Local or Atlas)  
**Architecture**: Simplified MVC with direct API calls  
**Storage**: Persistent (MongoDB)
