import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Scores from './pages/Scores';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

export default function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/scores" element={<Scores/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          {/* create more routes to add more navigatable pathways */}
          <Route path="*" element={<NotFound />} />
          {/* The above path to have app other route requests not list here to go to a 404 not found page */}
        </Routes>
      </main>
    </div>
  )
}