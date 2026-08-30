# -*- coding: utf-8 -*-
import os
import sys
import random
from sqlalchemy import text

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal
import models
from core.security import get_password_hash

def seed_providers():
    print("Iniciando semillero de 400 proveedores...")
    db = SessionLocal()
    
    print("Limpiando tablas de base de datos para sembrado limpio...")
    try:
        db.execute(text("DELETE FROM reviews;"))
        db.execute(text("DELETE FROM perfiles_prestador;"))
        db.execute(text("DELETE FROM perfiles_cliente;"))
        db.execute(text("DELETE FROM payment_cards;"))
        db.execute(text("DELETE FROM bookings;"))
        db.execute(text("DELETE FROM notifications;"))
        db.execute(text("DELETE FROM usuarios;"))
        db.commit()
    except Exception as e:
        print("Error limpiando base de datos:", e)
        db.rollback()
    
    # Hash password once to speed up execution
    hashed_password = get_password_hash("Password123!")
    
    first_names = [
        "Juan", "Carlos", "José", "Luis", "María", "Ana", "Jorge", "Pedro", "Manuel", 
        "Miguel", "David", "Francisco", "Javier", "Daniel", "Rosa", "Carmen", "Julia", 
        "Roberto", "Alejandro", "Víctor", "Sofía", "Camila", "Lucía", "Elena", "Raúl",
        "Gabriela", "Fernando", "Patricia", "Hugo", "Mónica"
    ]
    last_names = [
        "Pérez", "Gómez", "Quispe", "Rodríguez", "Flores", "Sánchez", "García", "Rojas", 
        "Díaz", "Torres", "Ramírez", "Cruz", "Chávez", "Gutiérrez", "Castillo", "Mendoza", 
        "Espinoza", "Vargas", "Ramos", "López", "Mamani", "Huamán", "Soto", "Morales",
        "Paredes", "Castro", "Salazar", "Guzmán", "Benitez", "Silva"
    ]

    locations = [
        ("Lima", "Lima", "Miraflores"),
        ("Lima", "Lima", "San Isidro"),
        ("Lima", "Lima", "Surco"),
        ("Lima", "Lima", "La Molina"),
        ("Lima", "Lima", "San Borja"),
        ("Lima", "Lima", "Barranco"),
        ("Lima", "Lima", "Magdalena"),
        ("Lima", "Lima", "San Miguel"),
        ("Arequipa", "Arequipa", "Yanahuara"),
        ("Arequipa", "Arequipa", "Cayma"),
        ("Arequipa", "Arequipa", "Cerro Colorado"),
        ("Arequipa", "Arequipa", "Selva Alegre"),
        ("La Libertad", "Trujillo", "Huanchaco"),
        ("La Libertad", "Trujillo", "Moche"),
        ("La Libertad", "Trujillo", "Victor Larco"),
        ("Cusco", "Cusco", "Wanchaq"),
        ("Cusco", "Cusco", "San Sebastian"),
        ("Cusco", "Cusco", "San Jeronimo"),
        ("Piura", "Piura", "Castilla"),
        ("Piura", "Piura", "Catacaos"),
        ("Piura", "Piura", "Sullana")
    ]

    oficios = ["Gasfitería", "Electricidad", "Limpieza", "Carpintería", "Pintura", "Refrigeración", "Cerrajería", "Mudanzas", "Fumigación", "Albañilería"]
    
    descripciones = [
        "Profesional con más de 5 años de experiencia. Garantizo puntualidad, orden y trabajos de alta calidad.",
        "Técnico especialista capacitado en ofrecer soluciones rápidas y eficientes para tu hogar o negocio. Instalaciones y reparaciones.",
        "Ofrezco un servicio honesto y transparente con precios justos. Garantía post-servicio de 30 días.",
        "Especialista en mantenimiento e instalaciones complejas. Experiencia comprobada y excelente trato.",
        "Brindo soluciones integrales con herramientas modernas y materiales de primera calidad."
    ]

    # Clear existing providers to avoid duplicates in testing if desired,
    # but we just generate 400 new ones with random emails
    
    inserted_count = 0
    for i in range(1, 401):
        nombre = random.choice(first_names)
        apellidos = random.choice(last_names) + " " + random.choice(last_names)
        email = f"proveedor_{i}_{random.randint(1000, 9999)}@chambista.pe"
        telefono = f"9{random.randint(10000000, 99999999)}"
        dni = f"{random.randint(10000000, 99999999)}"
        
        dept, prov, dist = random.choice(locations)
        oficio = random.choice(oficios)
        
        # Create user
        user = models.Usuario(
            nombre=nombre,
            apellidos=apellidos,
            email=email,
            telefono=telefono,
            dni=dni,
            hashed_password=hashed_password,
            ciudad=dept, # Use dept as city for backward compatibility
            distrito_principal=dist,
            departamento=dept,
            provincia=prov,
            rol="trabajador",
            activo=True
        )
        db.add(user)
        db.flush() # Obtain user.id
        
        # Map trade-specific tags using natural problem descriptions that 30-year-olds are likely to write in chat
        servicios_map = {
            "Gasfitería": "gasfitería, gotera, filtración, fuga de agua, caño que gotea, inodoro atorado, inodoro malogrado, desatorar desagüe, balon de gas, balon, instalacion de cocina, tubería rota, no sale agua",
            "Electricidad": "electricidad, corto circuito, se apagó la luz, foco quemado, enchufe roto, corriente, chispas, cables pelados, tablero eléctrico, termas eléctricas, instalaciones eléctricas, tomacorrientes",
            "Limpieza": "limpieza de casa, limpieza profunda, polvo, suciedad, limpiar departamento, limpieza post-obra, lavado de alfombras, desinfección de ambientes, lavado de muebles, orden de ambientes",
            "Carpintería": "carpintería, cajón atorado, puerta rota, bisagra rota, reparar sofa, reparar mesa, sillas sueltas, clóset de madera, barnizado, armar muebles, repisas",
            "Pintura": "pintura, humedad, moho, pintura descascarada, pintar pared, pintar sala, fachada, empastado, interiores, exteriores, pintar techo",
            "Refrigeración": "refrigeración, aire acondicionado no enfría, refrigeradora no congela, fuga de gas de aire, nevera malograda, congeladora, mantenimiento de aire acondicionado, recarga de gas",
            "Cerrajería": "cerrajería, perdí mi llave, puerta trabada, cambiar chapa, chapa atascada, copia de llaves, abrir candado, cerrojo malogrado, instalación de cerraduras",
            "Mudanzas": "mudanzas, llevar cosas, fletes, embalar cosas, transporte de carga, traslado de muebles, estiba, camión de mudanza, cargar cajas, trasladar departamento",
            "Fumigación": "fumigación, plaga de hormigas, cucarachas, ratas, arañas, insectos, desinsectación, desratización, desinfección de plagas, fumigar cocina",
            "Albañilería": "albañilería, pared rota, poner mayólica, tarrajear pared, piso rajado, asentar ladrillos, concreto, construcción, remodelación de baño, albañil"
        }
        servicios_value = servicios_map.get(oficio, f"Servicio estándar de {oficio}, Mantenimiento general, Reparaciones rápidas")

        # Create provider profile
        perfil = models.PerfilPrestador(
            usuario_id=user.id,
            oficio_principal=oficio,
            servicios=servicios_value,
            experiencia_anios=random.choice(["1-3 años", "4-7 años", "Más de 7 años"]),
            zonas_atencion=f"{dist}, {prov}",
            dias_trabajo="LUN,MAR,MIE,JUE,VIE",
            horario_atencion=random.choice(["Mañana", "Tarde", "Todo el dia"]),
            atiende_emergencias=random.choice([True, False]),
            descripcion=random.choice(descripciones),
            tipo_cobro=random.choice(["Por hora", "Por visita", "Por trabajo"]),
            precio_referencial=f"Desde S/ {random.randint(30, 80)}"
        )
        db.add(perfil)
        
        # Create 1-3 random reviews for each provider
        for r_idx in range(random.randint(1, 3)):
            review = models.Review(
                booking_id=random.randint(1, 5), # dummy
                provider_id=user.id,
                cliente_id=random.randint(1, 10), # dummy
                rating=float(random.choice([4.0, 4.5, 5.0, 5.0, 5.0])),
                texto=random.choice([
                    "Excelente servicio, muy recomendado.", 
                    "Llegó a tiempo y solucionó el problema rápido.", 
                    "Muy educado y limpio al trabajar.", 
                    "Trabajo profesional y ordenado."
                ])
            )
            db.add(review)
            
        inserted_count += 1
        if inserted_count % 50 == 0:
            print(f"Insertados {inserted_count} proveedores...")
            db.commit()
            
    db.commit()
    db.close()
    print("Semillero completado con éxito. 400 proveedores insertados.")

if __name__ == "__main__":
    # ⚠️  DESACTIVADO — No ejecutar en producción.
    # Este script inserta 400 usuarios bot y fue solo para desarrollo local.
    # Para rehabilitarlo, establece la variable de entorno: ALLOW_SEED=true
    if os.environ.get("ALLOW_SEED") == "true":
        seed_providers()
    else:
        print("❌ Script desactivado. Establece ALLOW_SEED=true para ejecutarlo.")
        print("   Ejemplo: ALLOW_SEED=true python push_providers.py")
        sys.exit(0)

