from app.models.seat import Seat


def test_create_event(client):
    response = client.post("/events", json={
        "name": "Test Event",
        "date": "2026-12-31T18:00:00",
        "total_seats": 5
    })

    assert response.status_code == 201


def test_lock_available_seat(client, app):
    client.post("/events", json={
        "name": "Event",
        "date": "2026-12-31T18:00:00",
        "total_seats": 1
    })

    with app.app_context():
        seat = Seat.query.first()

    response = client.post(f"/seats/{seat.id}/lock", json={
        "user_email": "user@test.com"
    })

    assert response.status_code == 200


def test_lock_already_locked_seat(client, app):
    client.post("/events", json={
        "name": "Event",
        "date": "2026-12-31T18:00:00",
        "total_seats": 1
    })

    with app.app_context():
        seat = Seat.query.first()

    client.post(f"/seats/{seat.id}/lock", json={
        "user_email": "user@test.com"
    })

    response = client.post(f"/seats/{seat.id}/lock", json={
        "user_email": "another@test.com"
    })

    assert response.status_code == 400


def test_confirm_without_lock(client, app):
    client.post("/events", json={
        "name": "Event",
        "date": "2026-12-31T18:00:00",
        "total_seats": 1
    })

    with app.app_context():
        seat = Seat.query.first()

    response = client.post(f"/seats/{seat.id}/confirm", json={
        "user_email": "user@test.com"
    })

    assert response.status_code == 400


def test_confirm_valid_lock(client, app):
    client.post("/events", json={
        "name": "Event",
        "date": "2026-12-31T18:00:00",
        "total_seats": 1
    })

    with app.app_context():
        seat = Seat.query.first()

    client.post(f"/seats/{seat.id}/lock", json={
        "user_email": "user@test.com"
    })

    response = client.post(f"/seats/{seat.id}/confirm", json={
        "user_email": "user@test.com"
    })

    assert response.status_code == 200