FROM node:16-alpine as builder

WORKDIR /code

COPY ./expressapp/package.json /code/package.json 

RUN npm install

COPY ./expressapp/.babelrc /code/.babelrc 

COPY ./expressapp  /code


EXPOSE 5000

#CMD npm run dev 
