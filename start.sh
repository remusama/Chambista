#!/bin/bash
set -e

PORT="${PORT:-3000}"

echo "=========================================="
echo " Iniciando Chambista Servidor Unificado"
echo " Puerto asignado por Railway: $PORT"
echo "=========================================="

# 1. Iniciar FastAPI Backend en 127.0.0.1:8000
cd /app/backend
echo "Iniciando FastAPI Backend en http://127.0.0.1:8000..."
uvicorn main:app --host 127.0.0.1 --port 8000 &
BACKEND_PID=$!

cleanup() {
    echo "Deteniendo servicios de Chambista..."
    kill -TERM "$BACKEND_PID" 2>/dev/null || true
    exit 0
}
trap cleanup SIGINT SIGTERM

# 2. Esperar a que FastAPI esté disponible
echo "Verificando disponibilidad de FastAPI..."
for i in {1..30}; do
    if curl -s http://127.0.0.1:8000/ > /dev/null 2>&1; then
        echo "FastAPI Backend listo y respondiendo."
        break
    fi
    sleep 0.5
done

# 3. Iniciar Next.js Frontend en 0.0.0.0:$PORT
cd /app
echo "Iniciando Next.js Frontend en 0.0.0.0:$PORT..."
pnpm start -p "$PORT" -H 0.0.0.0 &
FRONTEND_PID=$!

# Esperar a que alguno termine o falle
wait -n "$BACKEND_PID" "$FRONTEND_PID"
cleanup
