from fastapi import FastAPI
from backend.db.database import Base, engine
from backend.app.routers import users, cards, transactions

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="APNorman Case Credit Card API")

# Routers
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(cards.router, prefix="/cards", tags=["Credit Cards"])
app.include_router(transactions.router, prefix="/transactions", tags=["Transactions"])
