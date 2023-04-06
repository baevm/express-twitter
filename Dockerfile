FROM node:18-alpine

WORKDIR /user/src/express_twitter

COPY . .

RUN yarn

RUN yarn build

USER node

CMD ["yarn", "start:migrate:prod"]

