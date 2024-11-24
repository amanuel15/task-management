FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

ENV VITE_API_URL http://localhost:3000

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]