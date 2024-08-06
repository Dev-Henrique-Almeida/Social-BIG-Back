# Use uma imagem base oficial do Node.js
FROM node:16

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Gere o Prisma Client
RUN npx prisma generate

# Exponha a porta que a aplicação usa
EXPOSE 3001

# Defina o comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
