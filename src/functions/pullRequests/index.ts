// import schema from './schema';
import {handlerPath} from '@libs/handlerResolver';

export default
    {
        handler: `${handlerPath(__dirname)}/handler.main`,
        // reservedConcurrency:10,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'pullRequests/{user}/{repo}',
                    request: {
                        schema: {}
                    },
                    cors: true
                }
            }
        ]
    }
