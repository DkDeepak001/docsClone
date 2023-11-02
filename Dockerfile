FROM node:18

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install


COPY . .

RUN yarn prisma generate

CMD [ "yarn","run","dev" ]

EXPOSE 3000

