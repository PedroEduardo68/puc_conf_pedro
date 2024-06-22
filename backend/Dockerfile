# Dockerfile

#FROM node:18.16.0-alpine3.17
FROM node:20-alpine
COPY package.json  .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm","run","dev"]
