FROM node:16-alpine as builder

WORKDIR /code

COPY webpack.config.js /code/webpack.config.js 

COPY package.json /code/package.json 

COPY nodemon.json /code/nodemon.json

COPY .babelrc /code/.babelrc 

RUN npm install

COPY . /code

COPY .env /code/.env

# RUN npm install react-scripts@3.0.1 -g --silent

EXPOSE 6000

#CMD ["npm", "run", "dev"]
