import 'source-map-support/register';
import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import {Handler} from 'aws-lambda';
import PullRequestService from '../../services/PullRequestService';
import {getRepository} from '../../entities';
import {Repository} from "typeorm";
import {PullRequest} from "../../entities/PullRequest";
import {PullRequestParameters} from "repo-finder";

const pullRequests: Handler = async (event) => {
    const service = new PullRequestService(await getRepository('PullRequest') as Repository<PullRequest>);
    const response: Record<string, any> = await service.getAll(event.pathParameters as PullRequestParameters);
    return formatJSONResponse(response);
};

export const main = middyfy(pullRequests);
