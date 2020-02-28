#!/bin/bash

cd /source
rm -rf build && mkdir build
rm -rf dist && mkdir dist
git archive -o build/repo.tar HEAD

cd build
tar xf repo.tar

# Create and activate virtual env (needed for collecting statics in build time)
mkdir /site
virtualenv --python=python3 /site/env
source /site/env/bin/activate

# Install dependencies
pip install -r pip-requirements.txt
pip install -r pip-docker-requirements.txt
npm install

# Generate static resources tree
mkdir log  # Grunt task executes manage.py, which creates application.log
APPLICATION_ENVIRONMENT=build NODE_ENV=production grunt dist

# Create distribution tree
cd /site
tar xf /source/build/repo.tar src config
mv src app
mkdir files log
cp -a /source/build/static .

# Rebuild release.ini from the versioned resource filenames
cd static
echo "[app]" > ../config/release.ini
{
  echo css_common_file="$(ls css/common.*)"
  echo app_common_file="$(ls js/app-common.*)"
  echo app_main_file="$(ls js/app-main.*)"
  echo app_login_file="$(ls js/app-login.*)"
} >> ../config/release.ini

# Create distribution site
tar zcf /source/dist/site.tgz /site
