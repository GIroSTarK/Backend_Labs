FROM node:22.11.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npx sequelize-cli db:migrate:undo && npm start"]