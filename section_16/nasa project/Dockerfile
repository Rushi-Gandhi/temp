FROM node:lts-alpine

WORKDIR /app

COPY server/package.json server/

RUN npm install --prefix server

COPY server/ server/
USER node

CMD ["npm" , "run" , "watch" , "--prefix" , "server"]

EXPOSE 4000