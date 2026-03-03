import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking/:eventId" element={<Booking />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/events" element={<Events />} />
    </Routes>
  );
}

export default App;