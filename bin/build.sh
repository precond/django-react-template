#!/bin/bash

docker run -v $PWD:/source precond/dev /source/bin/docker-build.sh \
  && docker build -t precond/template .
