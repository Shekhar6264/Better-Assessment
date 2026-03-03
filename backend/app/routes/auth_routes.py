from flask import Blueprint, request, jsonify, current_app
from app.models.user import User
from app.extensions import db
import jwt
import datetime

auth_bp = Blueprint("auth_bp", __name__, url_prefix="/auth")

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 400

    user = User(email=email)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    # 🔥 Generate token immediately after signup
    token = jwt.encode(
        {
            "email": user.email,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        },
        current_app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return jsonify({
        "token": token,
        "email": user.email
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = jwt.encode(
        {
            "email": user.email,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        },
        current_app.config["SECRET_KEY"],   # ✅ using config secret
        algorithm="HS256"
    )

    return jsonify({
        "token": token,
        "email": user.email
    }), 200