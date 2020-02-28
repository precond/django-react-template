#!/bin/bash

source ./env/bin/activate

`aws --profile precondecr ecr get-login --no-include-email --region eu-north-1`

docker tag precond/template:latest 771840211994.dkr.ecr.eu-north-1.amazonaws.com/precond/template:latest \
  && docker push 771840211994.dkr.ecr.eu-north-1.amazonaws.com/precond/template:latest
