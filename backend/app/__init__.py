from flask import Flask
from flask_cors import CORS
from .extensions import db
from .routes.event_routes import event_bp
from .routes.seat_routes import seat_bp
from .utils.errors import APIError, handle_api_error
from app.routes.auth_routes import auth_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    # 🔥 Proper CORS setup
    CORS(app, resources={r"/*": {"origins": "*"}})

    db.init_app(app)

    @app.route("/")
    def home():
        return {"message": "Backend running"}, 200

    with app.app_context():
        db.create_all()

    app.register_blueprint(event_bp)
    app.register_blueprint(seat_bp)
    app.register_blueprint(auth_bp)

    app.register_error_handler(APIError, handle_api_error)

    return app