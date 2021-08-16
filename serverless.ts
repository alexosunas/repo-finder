import type { AWS } from '@serverless/typescript';
import pullRequests from '@functions/pullRequests';
import commits from '@functions/commits';

const serverlessConfiguration: AWS = {
  service: 'repo-finder',
  frameworkVersion: '2',
  useDotenv: true,
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
      "serverless-offline": {
        httpPort: 6868
      }
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements:[{
      Effect: 'Allow',
      Action: [
        'dynamodb:Query',
        'dynamodb:Scan',
        'dynamodb:GetItem',
        'dynamodb:PutItem',
        'dynamodb:UpdateItem',
        'dynamodb:DeleteItem'
      ],
      Resource: 'arn:aws:dynamodb:us-east-1:104731164119:table/pullRequestsTable'
    }, {
      Effect: 'Allow',
      Action: [
        'dynamodb:Query',
        'dynamodb:Scan',
        'dynamodb:GetItem',
        'dynamodb:PutItem',
        'dynamodb:UpdateItem',
        'dynamodb:DeleteItem'
      ],
      Resource: 'arn:aws:dynamodb:us-east-1:104731164119:table/commitsTable'
    }]
  },
  // import the function via paths
  functions: {
    pullRequests,
    commits
  },
  resources: {
    Resources: {
      pullRequestsTable: {
        Type : 'AWS::DynamoDB::Table',
        Properties : {
          TableName: 'pullRequestsTable',
          AttributeDefinitions: [{
            AttributeName: 'user',
            AttributeType: 'S'
          },{
            AttributeName: 'repo',
            AttributeType: 'S'
          }],
          KeySchema:[{
            AttributeName: 'user',
            KeyType: 'HASH'
          },{
            AttributeName: 'repo',
            KeyType: 'RANGE'
          }],
          ProvisionedThroughput:{
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      },
      commitsTables: {
        Type : 'AWS::DynamoDB::Table',
        Properties : {
          TableName: 'commitsTable',
          AttributeDefinitions: [{
            AttributeName: 'user',
            AttributeType: 'S'
          },{
            AttributeName: 'repo',
            AttributeType: 'S'
          }],
          KeySchema:[{
            AttributeName: 'user',
            KeyType: 'HASH'
          },{
            AttributeName: 'repo',
            KeyType: 'RANGE'
          }],
          ProvisionedThroughput:{
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
