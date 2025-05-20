# Backend/Dockerfile
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos y dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer puerto y correr servidor
EXPOSE 3017
CMD ["node", "src/server.js"]
