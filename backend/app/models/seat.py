from app.extensions import db
from datetime import datetime
import enum


class SeatStatus(enum.Enum):
    AVAILABLE = "AVAILABLE"
    LOCKED = "LOCKED"
    BOOKED = "BOOKED"


class Seat(db.Model):
    __tablename__ = "seats"

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"), nullable=False)
    seat_number = db.Column(db.String(10), nullable=False)

    status = db.Column(db.Enum(SeatStatus), nullable=False, default=SeatStatus.AVAILABLE)
    locked_by = db.Column(db.String(100), nullable=True)
    lock_expires_at = db.Column(db.DateTime, nullable=True)