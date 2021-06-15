FROM node:lts-slim

WORKDIR /app

# Install gatsby CLI
RUN npm install -g gatsby-cli

# Install required packages
COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm install

# # Run gatsby develop server
# CMD gatsby develop -H 0.0.0.0