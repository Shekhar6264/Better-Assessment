import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SeatGrid from "../components/SeatGrid";
import Navbar from "../components/Navbar";
import { getSeats, getEvents } from "../services/api";

function Booking() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    fetchEvent();
    fetchSeats();
  }, []);

  const fetchEvent = async () => {
    const data = await getEvents();
    const found = data.find(e => e.id === parseInt(eventId));
    setEvent(found);
  };

  const fetchSeats = async () => {
    const data = await getSeats(eventId);
    setSeats(data);
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "40px 80px" }}>
        <h1 style={{ marginBottom: "10px" }}>
          {event ? event.name : "Loading..."}
        </h1>

        <p style={{ color: "#666", marginBottom: "30px" }}>
          {event && new Date(event.date).toDateString()}
        </p>

        <SeatGrid seats={seats} refreshSeats={fetchSeats} />
      </div>
    </div>
  );
}

export default Booking;