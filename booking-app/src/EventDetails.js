import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/events/${id}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching event:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading event details...</div>;

  if (!event) return <div>No event found</div>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
    </div>
  );
}

export default EventDetails;
