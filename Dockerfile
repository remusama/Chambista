FROM python:3.12-slim

# Evitar prompts interactivos durante apt
ENV DEBIAN_FRONTEND=noninteractive
ENV PYTHONUNBUFFERED=1

# Instalar dependencias del sistema: curl, certificados, compilador para librerias nativas y Node.js 20
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    gcc \
    libpq-dev \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && npm install -g pnpm@10.7.1 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 1. Instalar dependencias de Python (FastAPI y modulos)
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r ./backend/requirements.txt

# 2. Instalar dependencias de Node.js (Next.js)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prefer-offline

# 3. Copiar todo el codigo fuente de la aplicacion
COPY . .

# 4. Compilar la aplicacion Next.js para produccion
ENV NODE_ENV=production
RUN pnpm run build

# 5. Puerto por defecto expuesto (Railway suministrara $PORT dinamicamente)
EXPOSE 3000

# 6. Permisos de ejecucion para el script de arranque
RUN chmod +x /app/start.sh

# 7. Ejecutar el script unificado que arranca FastAPI y Next.js
CMD ["/bin/bash", "/app/start.sh"]
