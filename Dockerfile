FROM node:4.7.2
RUN npm install -g bower

RUN mkdir /code
WORKDIR /code
ADD . /code/
RUN npm install
RUN bower install --allow-root
