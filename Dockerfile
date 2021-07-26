# First stage
FROM node:14-buster-slim as tsc-builder
WORKDIR /usr/src/app

COPY . .
RUN npm install

EXPOSE 8080

ENV TZ Europe/Paris

ENTRYPOINT [ "npm" ]
