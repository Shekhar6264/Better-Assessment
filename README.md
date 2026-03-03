# 🚀 EventX – Event Booking System

A full-stack event booking platform built using **Flask (API), React (Frontend), and SQLite (Relational Database)**.

This project demonstrates structured architecture, correctness constraints, JWT-based authentication, and a seat locking mechanism to prevent invalid booking states.

---

## 🏗 Tech Stack

### Backend
- Python
- Flask
- Flask-SQLAlchemy
- JWT Authentication
- SQLite (Relational Database)

### Frontend
- React
- React Router
- Fetch API
- Vanilla CSS

---

# 🎯 Problem Solved

This system allows users to:

- Sign up and log in securely (JWT-based authentication)
- View available events
- Lock seats temporarily
- Confirm bookings
- Prevent double-booking
- Handle seat expiry logic

**Core challenge solved:**  
Preventing invalid booking states while maintaining simplicity and clear system boundaries.

---

# 🧱 Architecture Overview

## Backend Structure

```
backend/
│
├── app/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── schemas/
│   ├── utils/
│   └── extensions.py
│
├── tests/
├── config.py
├── run.py
└── requirements.txt
```

## Design Decisions

- **Models** contain only database structure.
- **Routes** handle HTTP request/response logic.
- **Services** contain business rules (seat locking, confirmation).
- **Schemas** validate incoming request data.
- **Utils** centralize error handling.
- JWT validation protects booking routes.

This separation ensures:

- Clear boundaries  
- Predictable behavior  
- Change resilience  
- Easy testing  

---

# 🔐 Authentication Design

- JWT-based authentication
- Token contains email and expiration (2 hours)
- Protected routes require valid JWT
- Expired or invalid tokens return HTTP 401

### Design Choice

- Stateless authentication (no session storage)
- Decoupled authentication from business logic
- Token validation enforced before sensitive operations

---

# 🎟 Seat Locking System (Core Feature)

## Seat Lifecycle

```
AVAILABLE → LOCKED → BOOKED
```

## Rules Enforced

1. A seat cannot be locked if already BOOKED.
2. A seat cannot be locked if LOCKED and not expired.
3. Lock expires after a fixed duration.
4. Only the locking user can confirm booking.
5. Confirmation requires valid ownership and non-expired lock.

### Why This Matters

This prevents:

- Double booking
- Unauthorized confirmations
- Invalid state transitions
- Logical inconsistencies

The system explicitly guards against invalid states.

---

# ✅ Correctness & Safety

The system enforces:

- Input validation
- Unique email constraint
- Enum-based seat status
- JWT verification before protected actions
- Proper HTTP status codes (400, 401, 404, 200, 201)

Invalid transitions are prevented at the service layer.

---

# 🧪 Automated Tests

Backend includes tests verifying:

- Event creation
- Seat locking
- Lock conflict prevention
- Confirm without lock fails
- Valid lock confirmation succeeds

Run tests:

```bash
cd backend
pytest
```

Tests ensure behavior remains correct after changes.

---

# 🚀 How To Run

## Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate    # Windows
pip install -r requirements.txt
python run.py
```

Backend runs at:

```
http://127.0.0.1:5000
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🧠 AI Usage

AI was used as a development assistant with explicit constraints:

- Maintain modular architecture
- Avoid business logic inside routes
- Keep code readable and predictable
- Enforce valid seat state transitions
- Validate inputs before database writes
- Prefer simplicity over clever abstractions

All AI-generated code was manually reviewed and validated with automated tests.

AI was used as a tool, not as an autonomous system.

---

# ⚖️ Tradeoffs & Risks

## Current Limitations

- SQLite (single-instance only)
- No distributed locking
- No refresh token mechanism
- No role-based authorization

## If Extended for Production

- Replace SQLite with PostgreSQL
- Add Redis for distributed locking
- Add refresh tokens
- Add structured logging
- Add rate limiting
- Add role-based permissions

---

# 🛠 Extension Approach

Future enhancements could include:

- Admin event management
- Seat pricing tiers
- Payment integration
- Real-time seat updates (WebSockets)
- Event image uploads

The modular architecture allows these features to be added without large refactoring.

---

# 🎬 Walkthrough

A 10–15 minute walkthrough video accompanies this submission explaining:

- Architecture
- Seat locking logic
- Authentication design
- Testing approach
- AI usage
- Tradeoffs and extension strategy

---

# 📌 Summary

This project focuses on:

- Clear boundaries
- Simplicity over cleverness
- Correctness and safety
- Change resilience
- Interface protection
- Test-backed behavior

It is intentionally small, structured, and maintainable.
