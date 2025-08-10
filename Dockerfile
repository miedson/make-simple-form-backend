# =========================
# 1ª Etapa: Build da aplicação
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# =========================
# 2ª Etapa: Produção
# =========================
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

# Copia o arquivo .env para o container
COPY .env .env

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main.js"]

# =========================
# 3ª Etapa: Desenvolvimento (opcional)
# =========================
FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm ci

# Copia todo código fonte **e o arquivo .env** para desenvolvimento local
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]