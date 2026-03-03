from app import create_app
from app.extensions import db
from app.models.event import Event
from app.models.seat import Seat, SeatStatus
from datetime import datetime
import string

SEATS_PER_ROW = 12

app = create_app()

with app.app_context():

    # Clear old data (optional but clean)
    db.session.query(Seat).delete()
    db.session.query(Event).delete()
    db.session.commit()

    events = [
        Event(name="Music Concert", date=datetime(2026,5,1,18,0), total_seats=120),
        Event(name="Tech Summit 2026", date=datetime(2026,6,15,10,0), total_seats=150),
        Event(name="Comedy Night Live", date=datetime(2026,7,10,19,30), total_seats=80),
        Event(name="Startup Expo", date=datetime(2026,8,20,9,0), total_seats=200),
        Event(name="Cultural Fest", date=datetime(2026,9,5,17,0), total_seats=180),
        Event(name="DJ Night Bash", date=datetime(2026,10,12,20,0), total_seats=140),
        Event(name="AI Conference", date=datetime(2026,11,3,11,0), total_seats=160),
        Event(name="Cricket Screening Final", date=datetime(2026,12,1,16,0), total_seats=220),
        Event(name="Fashion Show 2026", date=datetime(2026,12,18,18,30), total_seats=130),
        Event(name="New Year Mega Party", date=datetime(2026,12,31,22,0), total_seats=250),
    ]

    db.session.add_all(events)
    db.session.commit()

    # Generate seats for each event
    for event in events:
        for i in range(event.total_seats):
            row_letter = string.ascii_uppercase[i // SEATS_PER_ROW]
            seat_number = (i % SEATS_PER_ROW) + 1

            seat = Seat(
                event_id=event.id,
                seat_number=f"{row_letter}{seat_number}",
                status=SeatStatus.AVAILABLE
            )

            db.session.add(seat)

    db.session.commit()

    print("✅ 10 events + seats created successfully!")