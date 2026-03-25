from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.db.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    cards = relationship("CreditCard", back_populates="owner")

class CreditCard(Base):
    __tablename__ = "credit_cards"
    id = Column(Integer, primary_key=True, index=True)
    card_number = Column(String, unique=True, index=True, nullable=False)
    expiration = Column(String, nullable=False)
    cvv = Column(String, nullable=False)
    limit = Column(Float, nullable=False)
    balance = Column(Float, default=0.0)
    active = Column(Boolean, default=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="cards")
    transactions = relationship("Transaction", back_populates="card")

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    card_id = Column(Integer, ForeignKey("credit_cards.id"))
    amount = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    merchant = Column(String, nullable=False)
    status = Column(String, default="authorized")
    card = relationship("CreditCard", back_populates="transactions")
