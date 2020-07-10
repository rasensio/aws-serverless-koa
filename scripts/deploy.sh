#!bin/bash
# export AWS_PROFILE=upgoal
# export S3_BUCKET=upgoal-lambda-deployments
# export STACK_NAME=UpgoalWebappStack
export AWS_PROFILE=default
export S3_BUCKET=rasensio-lambda-deployments
export STACK_NAME=RasensioHttpApiStack

sam package \
  --template-file template.yaml \
  --output-template-file package.yml \
  --profile $AWS_PROFILE \
  --s3-bucket $S3_BUCKET

sam deploy \
  --template-file package.yml \
  --stack-name $STACK_NAME \
  --profile $AWS_PROFILE \
  --capabilities CAPABILITY_IAM