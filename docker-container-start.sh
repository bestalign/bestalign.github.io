#!/bin/sh

echo "starting the container..."
docker container start gatsby-dev-env-container

echo "attaching to the container"
echo "Run the following command to start gatsby develop"
echo "gatsby develop -H 0.0.0.0"
docker attach gatsby-dev-env-container 