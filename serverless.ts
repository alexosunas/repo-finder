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
  },
  // import the function via paths
  functions: {
    pullRequests,
    commits
  },
};

module.exports = serverlessConfiguration;
