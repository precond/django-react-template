#!/bin/bash
NAME="template"                             # Name of the application
NUM_WORKERS=3                               # how many worker processes should Gunicorn spawn
DJANGO_SETTINGS_MODULE=template.settings    # which settings file should Django use
DJANGO_WSGI_MODULE=template.wsgi            # WSGI module name

ROOT_DIR=$PWD  # Run this command in the project root

# Activate the virtual environment
source $ROOT_DIR/env/bin/activate
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$ROOT_DIR/src:$PYTHONPATH

# The magic to make utf8 filenames in Django file uploads to work
export LANG='en_US.UTF-8'
export LC_ALL='en_US.UTF-8'

# Start your Django Unicorn
# Programs meant to be run under supervisor should not daemonize themselves (do not use --daemon)
exec $ROOT_DIR/env/bin/gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $NUM_WORKERS \
  --bind=0.0.0.0:6999 \
  --log-level=info \
  --log-file=$ROOT_DIR/log/gunicorn.log
