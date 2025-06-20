FROM node:20

WORKDIR /app

COPY package.json ./
COPY dist/ ./dist/
COPY server.js ./

RUN npm i

EXPOSE 8080
CMD [ "npm", "start" ]