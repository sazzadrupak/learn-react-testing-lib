FROM node:20.17-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

EXPOSE 2999

CMD ["npm", "run", "start"]