import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")

# Default local connection, user should update if needed
raw_url = os.getenv("DATABASE_URL", "sqlite:///./chambista.db")
if raw_url.startswith("sqlite:///"):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(base_dir, "chambista.db")
    SQLALCHEMY_DATABASE_URL = f"sqlite:///{db_path}"
else:
    SQLALCHEMY_DATABASE_URL = raw_url

# Fix for Supabase (SQLAlchemy requires postgresql:// instead of postgres://)
if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

import unicodedata
from sqlalchemy import event

def strip_accents(text_val):
    if not text_val:
        return ""
    return "".join(c for c in unicodedata.normalize('NFD', str(text_val))
                    if unicodedata.category(c) != 'Mn').lower()

if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
    @event.listens_for(engine, "connect")
    def connect(dbapi_connection, connection_record):
        dbapi_connection.create_function("strip_accents", 1, strip_accents)
else:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
