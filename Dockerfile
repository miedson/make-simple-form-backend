# Dockerfile
FROM node:20-alpine

# Cria diretório de trabalho
WORKDIR /app

# Copia apenas arquivos de dependência para instalar mais rápido em cache
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o restante do código
COPY . .

# Instala o CLI do Nest (útil para rodar comandos dentro do contêiner)
RUN npm install -g @nestjs/cli

# Porta padrão
EXPOSE 3000

# Comando padrão (é sobrescrito no docker-compose para dev)
CMD ["npm", "run", "start"]
