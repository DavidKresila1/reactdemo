import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) return <p>Loading events...</p>;

  return (
    <>
      <h2>Events</h2>
      {events.length === 0 ? <p>No events found.</p> : null}
      {events.map(event => (
        <div key={event.id} className="list-item">
          <strong>{event.title}</strong>
          <p>Date: {new Date(event.date).toLocaleString()}</p>
          <p>Location: {event.location}</p>
          <Link to={`/events/${event.id}`}>Details</Link>
        </div>
      ))}
    </>
  );
}

export default HomePage;
