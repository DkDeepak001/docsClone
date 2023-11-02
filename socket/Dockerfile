FROM node:18

WORKDIR /usr/src/app/socket

COPY package.json ./

RUN yarn install

COPY . .

CMD [ "yarn","run","dev" ]


EXPOSE 8000 3000

