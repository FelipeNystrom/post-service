FROM node:alpine
RUN apk add --no-cache python build-base
WORKDIR /post-service
COPY ./package.json .
RUN yarn install
COPY . .
CMD ["yarn", "run", "start"]