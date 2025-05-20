# Etapa 1: Compila TypeScript
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npx tsc

# Etapa 2: Ejecuta backend
FROM node:18

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --only=production

CMD ["node", "dist/index.js"]
