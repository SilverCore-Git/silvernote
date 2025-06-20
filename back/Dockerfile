FROM node:20

WORKDIR /app

COPY app.js ./
COPY package.json ./
COPY config.json ./

COPY routes/ ./routes/
COPY assets/ts/token.js ./assets/ts/token.js

RUN npm i

EXPOSE 3000
CMD [ "npm", "start" ]