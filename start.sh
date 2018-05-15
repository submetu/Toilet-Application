#!/bin/bash

cd ./IvenHome
rm -rf Frontendbuild
mkdir Frontendbuild
cp -r ../iven-ui/build/* ./Frontendbuild 
echo "Starting Docker Container for backend"
docker-compose up  --build

