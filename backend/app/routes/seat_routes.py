from flask import Blueprint, request, jsonify
from app.services.seat_service import lock_seat, confirm_booking
from app.utils.errors import APIError
import jwt
from flask import current_app

seat_bp = Blueprint("seat_bp", __name__, url_prefix="/seats")


def get_user_from_token():
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        raise APIError("Unauthorized", 401)

    try:
        token = auth_header.split(" ")[1]
        payload = jwt.decode(
            token,
            current_app.config["SECRET_KEY"],
            algorithms=["HS256"]
        )
        return payload["email"]
    except Exception:
        raise APIError("Invalid token", 401)


@seat_bp.route("/<int:seat_id>/lock", methods=["POST"])
def lock(seat_id):
    user_email = get_user_from_token()
    seat = lock_seat(seat_id, user_email)

    return jsonify({
        "message": "Seat locked",
        "seat_id": seat.id
    }), 200


@seat_bp.route("/<int:seat_id>/confirm", methods=["POST"])
def confirm(seat_id):
    user_email = get_user_from_token()
    booking = confirm_booking(seat_id, user_email)

    return jsonify({
        "message": "Seat booked",
        "booking_id": booking.id
    }), 200