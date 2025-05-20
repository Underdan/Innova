# Etapa 1: Compilación
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./


RUN npm install --legacy-peer-deps

COPY . .


RUN npm run build --configuration production --project=Frontend || npm run build


FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
