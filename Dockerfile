FROM node:18.12-alpine as base

WORKDIR /app
COPY package*.json ./
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . .
CMD ["node", "server.js"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install nodemon && npm install
COPY . .
CMD ["nodemon", "server.js"]
