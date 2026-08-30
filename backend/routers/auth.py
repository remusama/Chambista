from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
import models, schemas
from database import get_db
from core.security import (
    get_password_hash, verify_password, create_access_token,
    create_refresh_token, decode_access_token, decode_refresh_token,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from core.rate_limit import limit_login, limit_register

router = APIRouter()

class RefreshTokenRequest(BaseModel):
    refresh_token: str

from core.auth_deps import get_current_user


@router.get("/me")
def get_me(current_user: models.Usuario = Depends(get_current_user)):
    """Retorna los datos del usuario autenticado."""
    return {
        "id": current_user.id,
        "nombre": current_user.nombre,
        "email": current_user.email,
        "rol": current_user.rol,
        "apellidos": current_user.apellidos,
        "telefono": current_user.telefono,
    }


@router.post("/register", response_model=schemas.UsuarioResponse, dependencies=[Depends(limit_register)])
def register(user: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.Usuario).filter(models.Usuario.email == user.email.lower()).first()
    if db_user:
        raise HTTPException(status_code=400, detail="El email ya está registrado")
    
    hashed_password = get_password_hash(user.password)
    db_usuario = models.Usuario(
        nombre=user.nombre,
        email=user.email.lower(),
        telefono=user.telefono,
        rol=user.rol if user.rol else "cliente",
        dni=user.dni,
        apellidos=user.apellidos,
        ciudad=user.ciudad,
        distrito_principal=user.distrito_principal,
        hashed_password=hashed_password
    )
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario





@router.post("/login", response_model=schemas.Token, dependencies=[Depends(limit_login)])
def login(user_data: schemas.UsuarioLogin, db: Session = Depends(get_db)):
    user = db.query(models.Usuario).filter(models.Usuario.email == user_data.email.lower()).first()
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    refresh_token = create_refresh_token(data={"sub": user.email})
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "rol": user.rol,
        "nombre": user.nombre
    }


@router.post("/refresh", response_model=schemas.Token)
def refresh(data: RefreshTokenRequest, db: Session = Depends(get_db)):
    payload = decode_refresh_token(data.refresh_token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token inválido o expirado"
        )
    email = payload.get("sub")
    user = db.query(models.Usuario).filter(models.Usuario.email == email.lower()).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario asociado al token no encontrado"
        )
    
    access_token = create_access_token(data={"sub": user.email})
    refresh_token = create_refresh_token(data={"sub": user.email})
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "rol": user.rol,
        "nombre": user.nombre
    }


@router.get("/check-email")
def check_email(email: str, db: Session = Depends(get_db)):
    user = db.query(models.Usuario).filter(models.Usuario.email == email.lower()).first()
    return {"exists": user is not None}
