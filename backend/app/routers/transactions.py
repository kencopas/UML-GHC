from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.db.database import get_db
from backend.app.models import models
from backend.app.schemas import schemas
from typing import List

router = APIRouter()

@router.post("/", response_model=schemas.TransactionOut)
def create_transaction(transaction: schemas.TransactionCreate, db: Session = Depends(get_db)):
    # For demo: use first card
    card = db.query(models.CreditCard).first()
    if not card or not card.active:
        raise HTTPException(status_code=404, detail="Active card not found")
    if card.balance + transaction.amount > card.limit:
        raise HTTPException(status_code=400, detail="Limit exceeded")
    card.balance += transaction.amount
    new_tx = models.Transaction(card_id=card.id, amount=transaction.amount, merchant=transaction.merchant)
    db.add(new_tx)
    db.commit()
    db.refresh(new_tx)
    db.refresh(card)
    return new_tx

@router.get("/", response_model=List[schemas.TransactionOut])
def get_transactions(db: Session = Depends(get_db)):
    return db.query(models.Transaction).all()
