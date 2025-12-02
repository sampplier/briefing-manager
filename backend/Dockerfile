# Usa uma imagem do Node.js
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos do backend para o container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código para dentro do container
COPY . .

# Gera o Prisma Client
RUN npx prisma generate --schema=prisma/schema.prisma

# Expõe a porta do backend
EXPOSE 5000

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]
