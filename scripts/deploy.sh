#!bin/bash
# export AWS_PROFILE=myprofile
# export S3_BUCKET=some-s3-bucket
# export STACK_NAME=SomeStackName
export AWS_PROFILE=default
export S3_BUCKET=some-s3-bucket
export STACK_NAME=SomeStackName

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