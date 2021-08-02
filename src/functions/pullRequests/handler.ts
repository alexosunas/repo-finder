import 'source-map-support/register';
import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import {Handler} from 'aws-lambda';
import PullRequestService from '../../services/PullRequestService';

const pullRequests: Handler = async (event) => {
    const service = new PullRequestService();
    const response = await service.getAll(event.pathParameters);
    return formatJSONResponse(response);
};

export const main = middyfy(pullRequests);
