import {useState, useEffect} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Profile from './pages/Profile'
import FlightDetail from './pages/FlightDetail';


function App() {

  // const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null); // user state tracking
  const [message, setMessage] = useState('');
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${api}/api/auth/me`, {
      credentials: 'include'
    })
    .then(res => res.ok ? res.json() : null)
    .then(data => setUser(data));
  }, []); 

  const handleLogin = (user) => {
    // localStorage.setItem('token', newToken);
    // setToken(newToken);
    setUser(user); // Update user state
    setMessage('Logged in successfully.');
  };

  const handleLogout = async () => {
    // localStorage.removeItem('token');
    // setToken('');
    await fetch(`${api}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    setUser(null);
    setMessage('Logged out');
  };

  return (
    <>
      <Navbar token={user} onLogout={handleLogout}/>

      {message && (
        <div>
          {message}
        </div>
      )}

      <Routes>
        <Route path="/signup" element={<Signup onAuth={handleLogin} setMessage={setMessage}/>} />
        <Route path='/login' element={<Login onAuth={handleLogin} setMessage={setMessage} />} />
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/flights/:id" element={user ? <FlightDetail token={user} /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile token={user} /> : <Navigate to="/login"/> }/>
      </Routes>
    </>

    
  );
}

export default App
