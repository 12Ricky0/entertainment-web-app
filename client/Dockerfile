ARG NODE_VERSION=22.3.0
FROM node:${NODE_VERSION}-alpine as builder
WORKDIR /usr/src/app
COPY package.json  .
RUN npm install
COPY . .
RUN npm run build 

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html