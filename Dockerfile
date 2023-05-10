FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $PORT

# Run app
CMD [ "npm", "run", "start:prod" ]
