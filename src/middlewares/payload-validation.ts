import {get} from 'lodash';

const repoPayloadValidation = () => {
    return {
        before: handler => {
            const user = get(handler, 'event.pathParameters.user');
            const repo = get(handler, 'event.pathParameters.repo');

            if(!user) throw 'user value in path is needed.';
            if(!repo) throw 'repository value in path is needed.';
            return Promise.resolve();
        }
    }
};

const commitPayloadValidation = () => {
    return {
        before: handler => {
            const user = get(handler, 'event.pathParameters.user');
            const repo = get(handler, 'event.pathParameters.repo');
            const commitId = get(handler, 'event.pathParameters.commitId');

            if(!user) throw 'user value in path is needed.';
            if(!repo) throw 'repository value in path is needed.';
            if(!commitId) throw 'Commit Id value in path is needed.';
            return Promise.resolve();
        }
    }
};

const errorHandler = () => {
    return {
        onError: async handler => {
            const statusCode = get(handler.error, 'response.status', 400);
            const body = get(handler.error, 'response.statusText', handler.error);
            handler.response = {
                statusCode,
                body: String(body)
            };
            return Promise.resolve();
        }
    };
};

export {
    repoPayloadValidation,
    commitPayloadValidation,
    errorHandler
}