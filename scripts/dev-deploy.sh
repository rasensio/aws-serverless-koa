#!bin/bash
export AWS_PROFILE=default
export S3_BUCKET=some-webapp-api-deployment-dev
export STACK_NAME=SomeApiDev
export ENV=dev
export LOG_LEVEL=DEBUG
export PWD=$(pwd)

rm -rf $PWD/node_modules/aws-sdk

sam package \
  --template-file $PWD/template.yml \
  --output-template-file $PWD/package.yml \
  --profile $AWS_PROFILE \
  --s3-bucket $S3_BUCKET


sam deploy \
  --template-file $PWD/package.yml \
  --stack-name $STACK_NAME \
  --profile $AWS_PROFILE \
  --region us-east-1 \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides Environment=$ENV LogLevel=$LOG_LEVEL

npm i