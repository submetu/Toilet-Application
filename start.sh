#!/bin/bash
cd ./iven-ui
echo "----------------Building React app---------------------"
npm run build
cd ../IvenHome
rm -rf Frontendbuild
mkdir Frontendbuild
cp -r ../iven-ui/build/* ./Frontendbuild 
echo "----------------Starting Docker Container for backend------------------"
docker-compose up  --build

