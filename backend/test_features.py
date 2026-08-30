# -*- coding: utf-8 -*-
import os
from fastapi.testclient import TestClient
from main import app
from database import SessionLocal
import models

client = TestClient(app)

def test_user_validations():
    print("\n--- Probando Validaciones de Registro ---")
    
    # 1. Contraseña débil
    res = client.post("/api/auth/register", json={
        "nombre": "Test",
        "email": "test.val1@chambista.pe",
        "password": "weak",
        "telefono": "987654321",
        "dni": "12345678"
    })
    print("Registro con contraseña débil (debe fallar):", res.status_code, res.json().get("detail"))
    assert res.status_code == 422
    
    # 2. DNI incorrecto
    res = client.post("/api/auth/register", json={
        "nombre": "Test",
        "email": "test.val2@chambista.pe",
        "password": "PasswordStrong123!",
        "telefono": "987654321",
        "dni": "123" # muy corto
    })
    print("Registro con DNI inválido (debe fallar):", res.status_code, res.json().get("detail"))
    assert res.status_code == 422
    
    # 3. Teléfono incorrecto (no empieza con 9)
    res = client.post("/api/auth/register", json={
        "nombre": "Test",
        "email": "test.val3@chambista.pe",
        "password": "PasswordStrong123!",
        "telefono": "887654321", # no empieza con 9
        "dni": "12345678"
    })
    print("Registro con celular inválido (debe fallar):", res.status_code, res.json().get("detail"))
    assert res.status_code == 422


def test_auth_and_idor():
    print("\n--- Probando Autenticación e IDOR ---")
    
    # Intentar acceder a reservas sin token
    res = client.get("/api/bookings/")
    print("Obtener reservas sin token (debe fallar 401):", res.status_code)
    assert res.status_code == 401

    # Intentar acceder a dashboard de proveedor sin token
    res = client.get("/api/dashboard/provider")
    print("Obtener dashboard sin token (debe fallar 401):", res.status_code)
    assert res.status_code == 401


def test_intelligent_search():
    print("\n--- Probando Búsqueda Inteligente ---")
    
    # Buscar con tags y distrito
    res = client.post("/api/search/", json={
        "oficio": "Gasfitería",
        "distrito": "Miraflores",
        "tags": ["gotera", "fuga"]
    })
    print("Resultados de búsqueda (Gasfitería + Miraflores + gotera):", len(res.json()))
    if len(res.json()) > 0:
        first = res.json()[0]
        print(f"Primer resultado: {first['nombre']} | Oficio: {first['oficios']} | Zonas: {first['zonas_atencion']} | Rating: {first['rating']}")
    assert res.status_code == 200

    # Buscar "carpinteria" (sin tilde y minúsculas) para verificar insensibilidad a acentos y mayúsculas
    res_carp = client.post("/api/search/", json={
        "oficio": "carpinteria"
    })
    print("Resultados de búsqueda accent-insensitive (carpinteria):", len(res_carp.json()))
    assert res_carp.status_code == 200
    assert len(res_carp.json()) > 0
    print(f"Primer carpintero encontrado: {res_carp.json()[0]['nombre']} | Oficio: {res_carp.json()[0]['oficios']}")

if __name__ == "__main__":
    try:
        test_user_validations()
        test_auth_and_idor()
        test_intelligent_search()
        print("Todas las pruebas pasaron con exito")
    except AssertionError as e:
        print("Algunas pruebas fallaron:", e)
