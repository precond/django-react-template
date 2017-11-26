#!/bin/bash

source ./env/bin/activate

`aws ecr get-login --no-include-email --region eu-west-1`

docker tag precond/template:latest 777825236826.dkr.ecr.eu-west-1.amazonaws.com/precond/template:latest \
  && docker push 777825236826.dkr.ecr.eu-west-1.amazonaws.com/precond/template:latest
