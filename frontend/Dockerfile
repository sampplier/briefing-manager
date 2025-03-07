# Usa uma imagem do Node.js
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos do frontend para o container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código para dentro do container
COPY . .

# Constrói o frontend
RUN npm run build

# Instala um servidor para servir os arquivos estáticos
RUN npm install -g serve

# Expõe a porta do frontend
EXPOSE 3000

# Comando para rodar o servidor
CMD ["serve", "-s", "dist", "-l", "3000"]
