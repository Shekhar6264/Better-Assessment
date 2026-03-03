from app.extensions import db

class Event(db.Model):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    total_seats = db.Column(db.Integer, nullable=False)

    seats = db.relationship("Seat", backref="event", cascade="all, delete")