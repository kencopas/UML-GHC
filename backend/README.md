# APNorman Case Credit Card API

This is a production-grade backend API for modeling credit card transactions for the banking company APNorman Case.

## Features
- User and credit card management
- Transaction processing (authorization, limit checks)
- Modular, extensible FastAPI architecture
- SQLAlchemy ORM with database migrations
- Pydantic schemas for validation

## Project Structure
- `main.py` — API entry point
- `app/routers/` — API route definitions
- `app/models/` — SQLAlchemy models
- `app/schemas/` — Pydantic schemas
- `db/` — Database connection logic
- `config.py` — Configuration
- `tests/` — Test suite

## Setup
1. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
   Or use Poetry/PDM if preferred.

2. Run the API:
   ```sh
   uvicorn backend.main:app --reload
   ```

3. The API docs are available at `/docs` when running.

## Database
- Default: SQLite (for demo/dev)
- To use PostgreSQL, set the `DATABASE_URL` env variable in `config.py` or your environment.

## Extending
- Add new routers/services in `app/`
- Add new models in `app/models/`
- Add new schemas in `app/schemas/`

---

For production, add authentication, logging, and Docker support as needed.
