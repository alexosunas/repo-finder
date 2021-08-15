import 'source-map-support/register';
import {formatJSONResponse} from '@libs/apiGateway';
import {commitMiddyfy} from '@libs/lambda';
import {Handler} from 'aws-lambda';
import CommitService from '../../services/CommitService';
import {getRepository} from "../../entities";
import {Repository} from "typeorm";
import {Commit} from "../../entities/Commit";

const commits: Handler = async (event) => {
    const service = new CommitService(await getRepository('Commit') as Repository<Commit>);
    const response = <Record<string, any>>await service.getOne(event.queryStringParameters);
    return formatJSONResponse(response);
};

export const main = commitMiddyfy(commits);
