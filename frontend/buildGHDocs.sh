#!/bin/bash

# Building latest ui production build folder
REACT_APP_DEPLOYMENT_SERVER='gh-pages' npm run build

# Coping build folder to docs
rm -rf ../docs
cp -r ./build ../docs