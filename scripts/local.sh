#!/bin/sh
export AWS_PROFILE=default
export S3_BUCKET=some-webapp-api-deployment-dev
export STACK_NAME=MyApiDev
export ENV=dev

sam package \
  --template-file template.yml \
  --output-template-file package.yml \
  --profile $AWS_PROFILE \
  --s3-bucket $S3_BUCKET

sam local start-api --skip-pull-image --env-vars scripts/env.json --profile=default