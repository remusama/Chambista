import os
import logging
from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from dotenv import load_dotenv

# Asegurar carga de variables
load_dotenv(dotenv_path="../.env")

logger = logging.getLogger(__name__)

# Configuración de variables de entorno y fallback seguro
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if not SECRET_KEY:
    logger.warning("JWT_SECRET_KEY no está configurada en las variables de entorno. Usando clave de desarrollo por defecto.")
    SECRET_KEY = "supersecretkey_chambista_mvp_development"

REFRESH_SECRET_KEY = os.getenv("JWT_REFRESH_SECRET_KEY")
if not REFRESH_SECRET_KEY:
    REFRESH_SECRET_KEY = SECRET_KEY + "_refresh"

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60  # Reducido de 1 semana a 60 minutos
REFRESH_TOKEN_EXPIRE_DAYS = 7     # Duración del refresh token

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    encoded_jwt = jwt.encode(to_encode, REFRESH_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "access":
            return None
        return payload
    except jwt.JWTError:
        return None

def decode_refresh_token(token: str):
    try:
        payload = jwt.decode(token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "refresh":
            return None
        return payload
    except jwt.JWTError:
        return None
