import os
import json
from groq import Groq
from typing import Optional

def analyze_issue(text_description: str, base64_image: Optional[str] = None):
    """
    Analiza la descripción del problema del usuario y extrae información estructurada
    para optimizar la búsqueda de proveedores en Chambista.
    """
    try:
        client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
        
        system_prompt = """Eres el asistente inteligente de Chambista, encargado de ayudar a los clientes a encontrar al profesional ideal para su problema de servicio para el hogar o comercio en Perú.
        
        Analiza el problema descrito por el usuario y responde dirigiéndote a él de forma directa (en segunda persona, amigable y muy concisa, máximo 3 oraciones).
        
        Si la descripción ingresada por el usuario NO está relacionada con problemas de servicio para el hogar o comercio (plomería, electricidad, limpieza, cerrajería, pintura, etc.), o si es una consulta de conocimiento general externa, debes rechazar cortésmente la solicitud en el campo "mensaje_usuario", indicando que solo puedes asistirle con servicios y problemas del hogar en Chambista. En este caso de estar fuera de tema, debes establecer "categoria": null, "tags": [], "distrito": null y "urgencia": "baja".
        
        Debes extraer los siguientes campos y responder ÚNICA Y EXCLUSIVAMENTE con un objeto JSON válido con esta estructura exacta, sin texto antes ni después, sin Markdown (bloques ```json), sin explicaciones:
        {
          "mensaje_usuario": "Mensaje confirmando qué entendiste sobre su problema y sugiriendo la categoría de profesional necesaria o un rechazo cortés si no tiene relación. Ej: 'Veo que tienes un goteo molesto en el caño de tu cocina. Te sugiero contactar con un gasfitero para cambiar el empaque o la grifería cuanto antes.'",
          "categoria": "gasfiteria/electricidad/limpieza/carpinteria/pintura/refrigeracion/cerrajeria/fumigacion/mudanzas/albanileria o null si es off-topic",
          "tags": ["lista", "de", "palabras", "clave", "del", "problema"],
          "distrito": "Distrito si se menciona en el texto (ej. 'Miraflores', 'Surco', 'La Molina', 'San Miguel', 'San Isidro'), o null si no se menciona.",
          "urgencia": "alta/media/baja"
        }
        
        Categorías válidas permitidas:
        - gasfiteria
        - electricidad
        - limpieza
        - carpinteria
        - pintura
        - refrigeracion
        - cerrajeria
        - fumigacion
        - mudanzas
        - albanileria
        """

        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": text_description
                }
            ],
            response_format={"type": "json_object"}
        )
        
        content = response.choices[0].message.content
        return json.loads(content)
        
    except Exception as e:
        print(f"Error AI: {e}")
        # Fallback response for MVP
        return {
          "mensaje_usuario": "Basado en tu descripción, necesitas un profesional que pueda evaluar el problema de cerca.",
          "categoria": "gasfiteria",
          "tags": [],
          "distrito": None,
          "urgencia": "media"
        }
