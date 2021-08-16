import 'source-map-support/register';
import {formatJSONResponse} from '@libs/apiGateway';
import {commitMiddyfy} from '@libs/lambda';
import {Handler} from 'aws-lambda';
import CommitService from '../../services/CommitService';

const commits: Handler = async (event) => {
    const service = new CommitService();
    const response = <Record<string, any>>await service.getAll(event.pathParameters);
    return formatJSONResponse(response);
};

export const main = commitMiddyfy(commits);
