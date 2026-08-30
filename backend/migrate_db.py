# -*- coding: utf-8 -*-
import os
import sys

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import engine, Base
from sqlalchemy import text

def run_migration():
    print("Iniciando migración de base de datos en caliente...")
    # Executing raw sql to add columns if they do not exist
    with engine.begin() as conn:
        # Add departamento to usuarios
        try:
            conn.execute(text("ALTER TABLE usuarios ADD COLUMN departamento VARCHAR;"))
            print("Columna 'departamento' agregada a 'usuarios'.")
        except Exception as e:
            print("Columna 'departamento' ya existe o no se pudo agregar:", e)

        # Add provincia to usuarios
        try:
            conn.execute(text("ALTER TABLE usuarios ADD COLUMN provincia VARCHAR;"))
            print("Columna 'provincia' agregada a 'usuarios'.")
        except Exception as e:
            print("Columna 'provincia' ya existe o no se pudo agregar:", e)

        # Add provincia to perfiles_cliente
        try:
            conn.execute(text("ALTER TABLE perfiles_cliente ADD COLUMN provincia VARCHAR;"))
            print("Columna 'provincia' agregada a 'perfiles_cliente'.")
        except Exception as e:
            print("Columna 'provincia' ya existe o no se pudo agregar:", e)

    # Create any missing tables (like payment_cards)
    print("Creando tablas faltantes si las hubiera...")
    Base.metadata.create_all(bind=engine)
    print("Migración completada con éxito.")

if __name__ == "__main__":
    run_migration()
