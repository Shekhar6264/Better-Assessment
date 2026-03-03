const API = "http://127.0.0.1:5000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
}

export async function lockSeat(seatId, email) {
  const res = await fetch(`${API}/seats/${seatId}/lock`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ user_email: email })
  });

  return res.json();
}

export async function confirmSeat(seatId, email) {
  const res = await fetch(`${API}/seats/${seatId}/confirm`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ user_email: email })
  });

  return res.json();
}

export async function getEvents() {
  const res = await fetch(`${API}/events`);
  return res.json();
}

export async function getSeats(eventId) {
  const res = await fetch(`${API}/events/${eventId}/seats`);
  return res.json();
}