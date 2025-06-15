import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import HomePage from './HomePage';
import Venues from './Venues';
import EventDetails from './EventDetails';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={theme}>
      <Router>
        <header>
          Booking App - Current Theme: {theme}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            style={{ marginLeft: '20px' }}
          >
            Toggle Theme
          </button>
        </header>

        <nav>
          <Link to="/">Home</Link> | <Link to="/venues">Venues</Link> | <Link to="/events/1">Event Details</Link>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/events/:id" element={<EventDetails />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
