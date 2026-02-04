# Book Review App

A modern, minimalistic full-stack book review application built with React and Node.js/Express with MongoDB.

## Features

- User authentication (register/login)
- Full CRUD operations for book reviews
- Modern, clean UI with minimalistic design
- Loading and error states
- Star rating system
- Responsive design

## Tech Stack

### Frontend
- React 18
- React Router DOM
- React Icons
- CSS3

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Project Structure

```
book-review-app/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── BookCard.jsx
│   │   │   ├── BookForm.jsx
│   │   │   ├── Error.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── Modal.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.jsx
│   └── package.json
└── server/                # Node.js backend
    ├── controllers/       # Request handlers
    │   ├── authController.js
    │   └── bookController.js
    ├── middleware/        # Custom middleware
    │   └── auth.js
    ├── models/           # MongoDB schemas
    │   ├── Book.js
    │   └── User.js
    ├── routes/           # API routes
    │   ├── authRoutes.js
    │   └── bookRoutes.js
    ├── .env
    ├── server.js
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file is already configured with your MongoDB connection string:
```
MONGODB_URI= your mongouri/BookReview
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

4. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on http://localhost:5000

### Frontend Setup

1. Open a new terminal and navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The client will run on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Books
All book endpoints require authentication (Bearer token)

- `GET /api/books` - Get all books for logged-in user
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create new book review
- `PUT /api/books/:id` - Update book review
- `DELETE /api/books/:id` - Delete book review

## Usage

1. Register a new account or login
2. Click "Add Book Review" to create your first review
3. Fill in the book details (title, author, genre, rating, review, date read)
4. Click star icons to set your rating
5. View all your reviews on the dashboard
6. Edit or delete reviews using the buttons on each card

## Features Implemented

### Requirements Met

1. **Fetch data from backend API** ✓
   - Uses `fetch()` API
   - Implements `useEffect()` for initial data load
   - Handles JSON responses and stores in React state

2. **Display data dynamically** ✓
   - Uses `.map()` to render book list
   - Multiple components (App, Dashboard, BookCard, BookForm, etc.)
   - Displays 6+ fields per book (title, author, genre, rating, review, date)

3. **Loading and Error states** ✓
   - Loading spinner while fetching data
   - Error messages with retry functionality
   - Conditional rendering based on state

4. **User interaction (CRUD)** ✓
   - **Create**: Add new book reviews (POST)
   - **Read**: View all book reviews (GET)
   - **Update**: Edit existing reviews (PUT)
   - **Delete**: Remove reviews (DELETE)
   - All actions update UI without page refresh
   - Saving states during API calls

## Design Features

- Clean, modern white UI
- Minimalistic design
- React Icons for all icons (no emojis)
- Responsive grid layout
- Smooth transitions and hover effects
- Star rating system
- Modal dialogs for forms
- Loading spinners
- Error handling with retry options

## Security

- Passwords hashed with bcryptjs
- JWT token authentication
- Protected routes on backend
- Authorization checks for user-specific data

## License

MIT
