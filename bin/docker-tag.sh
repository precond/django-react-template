#!/bin/bash

confirm() {
    # call with a prompt string or use a default
    read -r -p "${1:-Are you sure? [y/N]} " response
    case "$response" in
        [yY][eE][sS]|[yY])
            true
            ;;
        *)
            false
            ;;
    esac
}

ecr_tag() {
  source ./env/bin/activate
  `aws --profile precondecr ecr get-login --no-include-email --region eu-north-1`

  MANIFEST=$(aws --profile precondecr --region eu-north-1 ecr batch-get-image --repository-name ${REPO} --image-ids imageTag=${IMAGE1} --query 'images[].imageManifest' --output text)
  aws --profile precondecr --region eu-north-1 ecr put-image --repository-name ${REPO} --image-tag ${IMAGE2} --image-manifest "$MANIFEST"
}

REPO=precond/template

IMAGE1=${1}
IMAGE2=${2}
if [ -z "${IMAGE1}" -o -z "${IMAGE2}" ]; then
  echo "Usage: docker-tag.sh <tag1> <tag2>"
  exit 1
fi

confirm "Tagging template app ${IMAGE1} as ${IMAGE2} [y/N]" && ecr_tag
