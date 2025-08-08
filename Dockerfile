# =========================
# 1ª Etapa: Build da aplicação
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# Copia apenas arquivos de dependências
COPY package*.json ./

# Instala todas as dependências (incluindo dev)
RUN npm ci

# Copia o restante do código
COPY . .

# Build da aplicação (Nest gera dist/)
RUN npm run build


# =========================
# 2ª Etapa: Produção
# =========================
FROM node:20-alpine AS production

WORKDIR /app

# Copia apenas arquivos de dependências
COPY package*.json ./

# Instala apenas dependências de produção
RUN npm ci --only=production

# Copia os arquivos compilados da etapa anterior
COPY --from=builder /app/dist ./dist

# Se houver outras pastas necessárias (ex: public, views), copiar também:
# COPY --from=builder /app/public ./public

# Define variável de ambiente para produção
ENV NODE_ENV=production

# Porta padrão do NestJS
EXPOSE 3000

# Comando de inicialização
CMD ["node", "dist/main.js"]