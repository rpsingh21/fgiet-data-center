FROM node:10-slim
RUN mkdir /code
WORKDIR /code/
COPY package.json /code/
RUN npm install
COPY . /code/
EXPOSE 4200
CMD [ "ng", "serve", "--host 0.0.0.0", "--port 4200" ]