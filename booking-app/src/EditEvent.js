import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    venueId: ''
  });

  // Load existing event
  useEffect(() => {
    fetch(`http://localhost:8080/events/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          title: data.title,
          date: data.date.slice(0, 16), // format for datetime-local input
          location: data.location,
          venueId: data.venueId
        });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/events/${id}?venueId=${formData.venueId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(() => {
        alert('Event updated');
        navigate('/');
      });
  };

  return (
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Date:</label><br />
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Location:</label><br />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Venue ID:</label><br />
          <input
            type="number"
            name="venueId"
            value={formData.venueId}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Update Event</button>
      </form>
    </div>
  );
}

export default EditEvent;
