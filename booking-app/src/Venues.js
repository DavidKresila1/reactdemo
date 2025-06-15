import React, { useEffect, useState } from 'react';

function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/venues')
      .then(res => res.json())
      .then(data => {
        setVenues(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching venues:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading venues...</div>;

  return (
    <div>
      <h2>Venues</h2>
      <ul>
        {venues.map(venue => (
          <li key={venue.id}>
            <strong>{venue.name}</strong><br />
            {venue.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Venues;
