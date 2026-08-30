from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from core.auth_deps import get_current_user

router = APIRouter()

@router.post("/", response_model=schemas.BookingResponse, status_code=status.HTTP_201_CREATED)
def create_booking(
    booking: schemas.BookingCreate, 
    db: Session = Depends(get_db), 
    current_user: models.Usuario = Depends(get_current_user)
):
    # IDOR Prevention: cliente_id must match the authenticated user
    if booking.cliente_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="No autorizado para crear una reserva para otro cliente."
        )

    cliente = db.query(models.Usuario).filter(models.Usuario.id == booking.cliente_id).first()
    provider = db.query(models.Usuario).filter(models.Usuario.id == booking.provider_id).first()
    
    if not cliente or not provider:
        raise HTTPException(status_code=404, detail="Cliente o Proveedor no encontrado")
        
    db_booking = models.Booking(
        cliente_id=booking.cliente_id,
        provider_id=booking.provider_id,
        servicio=booking.servicio,
        fecha=booking.fecha,
        hora=booking.hora,
        estado="nueva",
        precio_estimado=booking.precio_estimado,
        direccion=booking.direccion,
        descripcion=booking.descripcion,
        fotos=booking.fotos
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    
    # Crear notificación para el proveedor
    db_notif = models.Notification(
        user_id=booking.provider_id,
        tipo="trabajo_nuevo",
        titulo="Nueva solicitud de trabajo",
        contenido=f"Tienes una nueva solicitud para: {booking.servicio}"
    )
    db.add(db_notif)
    db.commit()
    
    return db_booking

@router.get("/", response_model=list[schemas.BookingResponse])
def get_bookings(
    provider_id: int = None, 
    cliente_id: int = None, 
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(get_current_user)
):
    query = db.query(models.Booking)
    
    # IDOR Prevention & filtering: users can only see their own bookings
    if current_user.rol == "cliente":
        # Client can only see their bookings
        query = query.filter(models.Booking.cliente_id == current_user.id)
        if cliente_id and cliente_id != current_user.id:
            raise HTTPException(status_code=403, detail="No autorizado para ver las reservas de otro cliente.")
    elif current_user.rol in ["trabajador", "independiente", "empresa", "proveedor"]:
        # Provider can only see bookings assigned to them
        query = query.filter(models.Booking.provider_id == current_user.id)
        if provider_id and provider_id != current_user.id:
            raise HTTPException(status_code=403, detail="No autorizado para ver las reservas de otro proveedor.")
    else:
        # Fallback security filtering if role is unspecified
        query = query.filter(
            (models.Booking.cliente_id == current_user.id) | 
            (models.Booking.provider_id == current_user.id)
        )
        
    # Additional filters from query parameters if requested and authorized
    if provider_id and current_user.id == provider_id:
        query = query.filter(models.Booking.provider_id == provider_id)
    if cliente_id and current_user.id == cliente_id:
        query = query.filter(models.Booking.cliente_id == cliente_id)
        
    return query.all()

@router.patch("/{booking_id}", response_model=schemas.BookingResponse)
def update_booking_status(
    booking_id: int, 
    estado: str, 
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(get_current_user)
):
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
        
    # IDOR Prevention: check if booking belongs to the current user (either as client or provider)
    if booking.cliente_id != current_user.id and booking.provider_id != current_user.id:
        raise HTTPException(status_code=403, detail="No autorizado para modificar esta reserva.")
        
    estados_validos = ["nueva", "pendiente", "programada", "en camino", "iniciado", "completada", "rechazada", "cancelada"]
    if estado not in estados_validos:
        raise HTTPException(status_code=400, detail="Estado inválido")
        
    booking.estado = estado
    db.commit()
    db.refresh(booking)
    
    # Notify other party
    other_party_id = booking.cliente_id if current_user.id == booking.provider_id else booking.provider_id
    db_notif = models.Notification(
        user_id=other_party_id,
        tipo="booking_actualizado",
        titulo="Estado de reserva actualizado",
        contenido=f"Tu reserva para '{booking.servicio}' ha sido marcada como: {estado}"
    )
    db.add(db_notif)
    db.commit()
    
    return booking

@router.delete("/{booking_id}")
def delete_booking(
    booking_id: int, 
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(get_current_user)
):
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
        
    # IDOR Prevention: only the owner/client or provider of the booking can delete it
    if booking.cliente_id != current_user.id and booking.provider_id != current_user.id:
        raise HTTPException(status_code=403, detail="No autorizado para eliminar esta reserva.")
        
    db.delete(booking)
    db.commit()
    return {"message": "Reserva eliminada"}
