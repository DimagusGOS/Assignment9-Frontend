import {useState} from 'react';
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

  const [token, setToken] =
  useState(localStorage.getItem('token') || '');
  const [message, setMessage] = useState('');

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setMessage('Logged in successfully.');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setMessage('Logged out');
  };

  return (
    <>
      <Navbar token={token} onLogout={handleLogout}/>

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
        <Route path="/flights/:id" element={token ? <FlightDetail token={token} /> : <Navigate to="/login" />} />
        <Route path="/profile" element={token ? <Profile token={token} /> : <Navigate to="/login"/> }/>
      </Routes>
    </>

    
  );
}

export default App
