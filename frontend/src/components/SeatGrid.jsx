function groupSeatsByRow(seats) {
  const grouped = {};

  seats.forEach(seat => {
    const row = seat.seat_number[0];
    if (!grouped[row]) grouped[row] = [];
    grouped[row].push(seat);
  });

  return grouped;
}

function SeatGrid({ seats, refreshSeats }) {
  const groupedSeats = groupSeatsByRow(seats);

  const handleClick = async (seat) => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    let endpoint = "";
    if (seat.status === "AVAILABLE") {
      endpoint = "lock";
    } else if (seat.status === "LOCKED") {
      endpoint = "confirm";
    } else {
      return;
    }

    const res = await fetch(
      `http://127.0.0.1:5000/seats/${seat.id}/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ user_email: email })
      }
    );

    const data = await res.json();

    if (data.error) {
      alert(data.error);
    }

    refreshSeats();
  };

  return (
    <div style={{ textAlign: "center" }}>
      {Object.keys(groupedSeats).map(row => (
        <div key={row} style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
            {row}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap"
            }}
          >
            {groupedSeats[row].map(seat => (
              <div
                key={seat.id}
                onClick={() => handleClick(seat)}
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "6px",
                  border: "2px solid",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  background:
                    seat.status === "BOOKED"
                      ? "#bdc3c7"
                      : seat.status === "LOCKED"
                      ? "#f39c12"
                      : "white",
                  borderColor:
                    seat.status === "BOOKED"
                      ? "#bdc3c7"
                      : seat.status === "LOCKED"
                      ? "#f39c12"
                      : "#2ecc71",
                  color:
                    seat.status === "AVAILABLE"
                      ? "#2ecc71"
                      : "white"
                }}
              >
                {seat.seat_number}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginTop: "40px"
        }}
      >
        <div><span style={{ color: "#2ecc71" }}>■</span> Available</div>
        <div><span style={{ color: "#f39c12" }}>■</span> Locked</div>
        <div><span style={{ color: "#bdc3c7" }}>■</span> Booked</div>
      </div>
    </div>
  );
}

export default SeatGrid;