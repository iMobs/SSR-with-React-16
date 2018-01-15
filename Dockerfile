FROM node:alpine as build
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --silent
COPY . .
RUN yarn build -p
RUN rm -r node_modules

FROM node:alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --silent
COPY --from=build /usr/src/app .
EXPOSE 8080
CMD ["yarn", "start"]
