from datetime import datetime, timedelta
from app.models.seat import Seat, SeatStatus
from app.models.booking import Booking
from app.extensions import db
from app.utils.errors import APIError

LOCK_DURATION_MINUTES = 10


def lock_seat(seat_id, user_email):
    seat = Seat.query.get(seat_id)

    if not seat:
        raise APIError("Seat not found", 404)

    # 1️⃣ If already booked → reject
    if seat.status == SeatStatus.BOOKED:
        raise APIError("Seat already booked", 400)

    # 2️⃣ If locked and NOT expired → reject
    if (
        seat.status == SeatStatus.LOCKED
        and seat.lock_expires_at
        and seat.lock_expires_at > datetime.utcnow()
    ):
        raise APIError("Seat already locked", 400)

    # 3️⃣ If locked but expired → release it
    if (
        seat.status == SeatStatus.LOCKED
        and seat.lock_expires_at
        and seat.lock_expires_at < datetime.utcnow()
    ):
        seat.status = SeatStatus.AVAILABLE
        seat.locked_by = None
        seat.lock_expires_at = None
        db.session.commit()

    # 4️⃣ Lock seat
    seat.status = SeatStatus.LOCKED
    seat.locked_by = user_email
    seat.lock_expires_at = datetime.utcnow() + timedelta(minutes=LOCK_DURATION_MINUTES)

    db.session.commit()
    return seat

def confirm_booking(seat_id, user_email):
    seat = Seat.query.get(seat_id)

    if not seat:
        raise APIError("Seat not found", 404)

    if seat.status != SeatStatus.LOCKED:
        raise APIError("Seat must be locked before confirming", 400)

    if seat.locked_by != user_email:
        raise APIError("You do not own this lock", 403)

    if not seat.lock_expires_at or seat.lock_expires_at < datetime.utcnow():
        raise APIError("Lock expired", 400)

    # Confirm booking
    seat.status = SeatStatus.BOOKED
    seat.locked_by = None
    seat.lock_expires_at = None

    booking = Booking(seat_id=seat.id, user_email=user_email)
    db.session.add(booking)

    db.session.commit()

    return booking