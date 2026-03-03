from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.event import Event
from app.models.seat import Seat
from app.schemas.event_schema import EventCreateSchema
from app.models.seat import SeatStatus
import string

event_bp = Blueprint("event_bp", __name__, url_prefix="/events")

event_schema = EventCreateSchema()
SEATS_PER_ROW = 12


@event_bp.route("", methods=["POST"])
def create_event():
    data = request.get_json()

    try:
        validated_data = event_schema.load(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    event = Event(
        name=validated_data["name"],
        date=validated_data["date"],
        total_seats=validated_data["total_seats"]
    )

    db.session.add(event)
    db.session.commit()

    # Auto-create seats with row format A1, A2...
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

    return jsonify({
        "message": "Event created",
        "event_id": event.id
    }), 201


@event_bp.route("/<int:event_id>/seats", methods=["GET"])
def get_seats(event_id):
    event = Event.query.get(event_id)

    if not event:
        return jsonify({"error": "Event not found"}), 404

    seats = Seat.query.filter_by(event_id=event_id).all()

    result = [
        {
            "id": seat.id,
            "seat_number": seat.seat_number,
            "status": seat.status.value,
            "locked_by": seat.locked_by
        }
        for seat in seats
    ]

    return jsonify(result), 200


@event_bp.route("", methods=["GET"])
def get_events():
    events = Event.query.all()

    return jsonify([
        {
            "id": e.id,
            "name": e.name,
            "date": e.date.isoformat(),
            "total_seats": e.total_seats
        }
        for e in events
    ]), 200