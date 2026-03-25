from pydantic import BaseModel, EmailStr, StringConstraints
from typing import Optional, List, Annotated
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    class Config:
        from_attributes = True

class CreditCardBase(BaseModel):
    card_number: Annotated[
        str,
        StringConstraints(min_length=16, max_length=16)
    ]
    expiration: str
    cvv: Annotated[
        str,
        StringConstraints(min_length=3, max_length=4)
    ]
    limit: float

class CreditCardCreate(CreditCardBase):
    pass

class CreditCardOut(CreditCardBase):
    id: int
    balance: float
    active: bool
    class Config:
        from_attributes = True

class TransactionBase(BaseModel):
    amount: float
    merchant: str

class TransactionCreate(TransactionBase):
    pass

class TransactionOut(TransactionBase):
    id: int
    timestamp: datetime
    status: str
    class Config:
        from_attributes = True
