import 'source-map-support/register';
import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import {Handler} from 'aws-lambda';

const pullRequests: Handler = async (event) => {
    return formatJSONResponse({test:"works"});
};

export const main = middyfy(pullRequests);
