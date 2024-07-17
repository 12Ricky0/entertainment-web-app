ARG NODE_VERSION=22.3.0
FROM node:${NODE_VERSION}-alpine 
WORKDIR /usr/src/app
COPY package*.json  ./
RUN npm install
COPY . .
CMD npm start