import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";

function Home() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const eventsRef = useRef(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/events")
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setFilteredEvents(data);
      });
  }, []);

  const handleSearch = (query) => {
    const filtered = events.filter(event =>
      event.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredEvents(filtered);

    if (eventsRef.current) {
      eventsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />

      {/* HERO */}
      <div className="hero">
        <div>
          <h1>Discover Live Experiences</h1>
          <p>Concerts • Tech Events • Comedy Shows • Festivals</p>
          <button
            className="hero-btn"
            onClick={() =>
              eventsRef.current.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Now
          </button>
        </div>
      </div>

      {/* EVENTS */}
      <div className="section" ref={eventsRef}>
        <div className="section-header">
          <h2>Recommended Events</h2>
        </div>

        <div className="events-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p style={{ padding: "20px", color: "#888" }}>
              No events found.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;