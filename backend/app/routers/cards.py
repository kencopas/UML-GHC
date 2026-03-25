from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.db.database import get_db
from backend.app.models import models
from backend.app.schemas import schemas
from typing import List

router = APIRouter()

@router.post("/", response_model=schemas.CreditCardOut)
def create_card(card: schemas.CreditCardCreate, db: Session = Depends(get_db)):
    db_card = db.query(models.CreditCard).filter(models.CreditCard.card_number == card.card_number).first()
    if db_card:
        raise HTTPException(status_code=400, detail="Card already exists")
    new_card = models.CreditCard(**card.model_dump())
    db.add(new_card)
    db.commit()
    db.refresh(new_card)
    return new_card

@router.get("/", response_model=List[schemas.CreditCardOut])
def get_cards(db: Session = Depends(get_db)):
    return db.query(models.CreditCard).all()
