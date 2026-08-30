from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
from core.auth_deps import get_current_user
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class CardCreate(BaseModel):
    brand: str
    number: str # We only store last4
    exp_month: int
    exp_year: int
    cardholder: str

class CardResponse(BaseModel):
    id: int
    brand: str
    last4: str
    exp_month: int
    exp_year: int
    cardholder: str

    class Config:
        from_attributes = True

class TransactionResponse(BaseModel):
    id: int
    booking_id: int
    service: str
    amount: float
    status: str
    date: str
    type: str # "pago" (client) or "ingreso" (provider)
    counterpart: str # client or provider name

@router.get("/methods", response_model=List[CardResponse])
def get_payment_methods(
    current_user: models.Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve saved payment cards for current user."""
    cards = db.query(models.PaymentCard).filter(
        models.PaymentCard.user_id == current_user.id
    ).all()
    return cards

@router.post("/methods", response_model=CardResponse, status_code=status.HTTP_201_CREATED)
def add_payment_method(
    card_data: CardCreate,
    current_user: models.Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Save a new payment card for current user (simulated)."""
    # Simple validation
    clean_number = "".join(c for c in card_data.number if c.isdigit())
    if len(clean_number) < 13 or len(clean_number) > 19:
        raise HTTPException(status_code=400, detail="Número de tarjeta inválido.")
    
    last4 = clean_number[-4:]
    
    db_card = models.PaymentCard(
        user_id=current_user.id,
        brand=card_data.brand,
        last4=last4,
        exp_month=card_data.exp_month,
        exp_year=card_data.exp_year,
        cardholder=card_data.cardholder
    )
    db.add(db_card)
    db.commit()
    db.refresh(db_card)
    return db_card

@router.delete("/methods/{card_id}")
def delete_payment_method(
    card_id: int,
    current_user: models.Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Remove a saved payment card."""
    card = db.query(models.PaymentCard).filter(
        models.PaymentCard.id == card_id,
        models.PaymentCard.user_id == current_user.id
    ).first()
    if not card:
        raise HTTPException(status_code=404, detail="Tarjeta no encontrada.")
    
    db.delete(card)
    db.commit()
    return {"ok": True, "message": "Tarjeta eliminada."}

@router.get("/transactions", response_model=List[TransactionResponse])
def get_transactions(
    current_user: models.Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get simulated transactions based on completed or active bookings."""
    # Find bookings where user is client or provider
    bookings = db.query(models.Booking).filter(
        (models.Booking.cliente_id == current_user.id) |
        (models.Booking.provider_id == current_user.id)
    ).order_by(models.Booking.created_at.desc()).all()
    
    transactions = []
    for b in bookings:
        # Determine transaction type and counterpart
        if b.cliente_id == current_user.id:
            t_type = "pago" # Client pays
            provider = db.query(models.Usuario).filter(models.Usuario.id == b.provider_id).first()
            counterpart = provider.nombre if provider else "Proveedor"
        else:
            t_type = "ingreso" # Provider receives income
            client = db.query(models.Usuario).filter(models.Usuario.id == b.cliente_id).first()
            counterpart = client.nombre if client else "Cliente"
            
        transactions.append(TransactionResponse(
            id=b.id,
            booking_id=b.id,
            service=b.servicio or "Servicio General",
            amount=b.precio_estimado or 50.0,
            status="completado" if b.estado == "completada" else ("pendiente" if b.estado in ["nueva", "pendiente", "programada"] else "fallido"),
            date=b.fecha or str(b.created_at.date()),
            type=t_type,
            counterpart=counterpart
        ))
        
    return transactions
