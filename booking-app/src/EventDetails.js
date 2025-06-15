import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error('Failed to fetch event:', err));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      fetch(`http://localhost:8080/events/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          alert('Event deleted');
          navigate('/');
        })
        .catch((err) => console.error('Delete failed:', err));
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Venue ID:</strong> {event.venueId}</p>

      <Link to={`/events/${id}/edit`}>
        <button style={{ marginRight: '10px' }}>Edit</button>
      </Link>

      <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
        Delete
      </button>
    </div>
  );
}

export default EventDetails;
