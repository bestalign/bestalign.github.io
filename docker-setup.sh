#!/bin/sh

echo "building a docker image..."
echo "this may take a few minutes to install all necessary node modules..."
docker build -t gatsby-dev-env-image .

echo "creating a volume for node_modules..."
docker volume create gatsby-node-modules

echo "creating a container..."
docker container create -it -p 8000:8000 -v ${PWD}:/app -v gatsby-node-modules:/app/node_modules --name gatsby-dev-env-container gatsby-dev-env-image /bin/bash