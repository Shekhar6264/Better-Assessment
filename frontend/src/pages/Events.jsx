import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/events")
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Available Events</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {events.map(event => (
          <div
            key={event.id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
            onClick={() => navigate(`/booking/${event.id}`)}
          >
            <h3>{event.name}</h3>
            <p>{new Date(event.date).toDateString()}</p>
            <p>Total Seats: {event.total_seats}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;