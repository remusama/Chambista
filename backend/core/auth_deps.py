from fastapi import Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import Optional
from database import get_db
import models
from core.security import decode_access_token

def get_current_user(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)) -> models.Usuario:
    """Dependency: retorna el Usuario actual desde el JWT, o levanta 401."""
    if not authorization:
        raise HTTPException(status_code=401, detail="No autenticado. Token de autorización requerido.")
    try:
        scheme, token = authorization.split(" ")
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Tipo de esquema de token inválido. Debe ser Bearer.")
        payload = decode_access_token(token)
        if not payload:
            raise HTTPException(status_code=401, detail="Token de acceso inválido o expirado.")
        
        email: str = payload.get("sub")
        user = db.query(models.Usuario).filter(models.Usuario.email == email.lower(), models.Usuario.activo == True).first()
        if not user:
            raise HTTPException(status_code=401, detail="Usuario no encontrado o inactivo.")
        return user
    except (ValueError, AttributeError):
        raise HTTPException(status_code=401, detail="Formato de token inválido.")
