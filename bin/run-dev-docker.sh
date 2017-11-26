#!/bin/bash

docker run \
  --publish 6999:8080 \
  --user www-data:www-data \
  --env APPLICATION_NAME=template \
  --env APPLICATION_ENVIRONMENT=development \
  --env APPLICATION_WSGI_RUNNER=bjoern \
  --volume $PWD/db.sqlite3:/site/db.sqlite3 \
  --volume $PWD/files/:/site/files \
  --volume $PWD/log:/site/log \
  precond/template
