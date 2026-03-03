import { useNavigate } from "react-router-dom";

const eventImages = {
  "Music Concert":
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070",

  "Tech Summit 2026":
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2070",

  "Comedy Night Live":
    "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=2070",

  "Startup Expo":
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070",

  "Cultural Fest":
    "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?q=80&w=2070",

  "DJ Night Bash":
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070",

  "AI Conference":
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070",

  "Cricket Screening Final":
"https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2070",
  "Fashion Show 2026": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070",

  "New Year Mega Party":
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070"
};

function EventCard({ event }) {
  const navigate = useNavigate();

  const image =
    eventImages[event.name] ||
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070";

  return (
    <div
      className="event-card"
      onClick={() => navigate(`/booking/${event.id}`)}
    >
      <div className="event-image-wrapper">
        <img src={image} alt={event.name} />

        <div className="event-overlay">
          <button className="book-btn">Book Now</button>
        </div>
      </div>

      <div className="event-card-content">
        <h3>{event.name}</h3>
        <p>{new Date(event.date).toDateString()}</p>
      </div>
    </div>
  );
}

export default EventCard;