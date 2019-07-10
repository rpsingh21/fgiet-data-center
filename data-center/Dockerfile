FROM node:10-slim

# RUN npm install -g create-react-app
# RUN mkdir /app
# WORKDIR /app
# COPY . /app/
# EXPOSE 3000
# RUN npm install
# CMD [ "npm", "start" ]

WORKDIR /code/
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]