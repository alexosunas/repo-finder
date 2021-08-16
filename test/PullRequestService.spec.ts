import PullRequestService from '../src/services/PullRequestService';
// import GitService from "../src/services/GitService";
import axios from 'axios';
import * as AWS from 'aws-sdk';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
import {mocked} from 'ts-jest/utils'

jest.mock("aws-sdk", () => {
    return {
        DynamoDB: {
            DocumentClient: jest.fn(),
        },
    };
});

describe('PullRequestService', () => {
    describe('when user and repo are valid values', () => {
        // beforeEach(() => {
        //     // const dynamoInstance = {
        //     //     put: jest.fn().mockImplementation(() => Promise.resolve([])),
        //     //     query: jest.fn().mockImplementation(() => Promise.resolve([{
        //     //         user: 'jondoe',
        //     //         repo: 'repo-finder-123',
        //     //         repoName: 'repo-finder',
        //     //         commitsId: '123',
        //     //         id: 23,
        //     //         url: 'someurl.com',
        //     //         state: 'open'
        //     //     }])),
        //     // };
        //
        //     // jest.mock('aws-sdk', () => {
        //     //     return {
        //     //         DynamoDB: jest.fn(() => {
        //     //             return {
        //     //                 DocumentClient: function () {
        //     //                     return dynamoInstance
        //     //                 }
        //     //             }
        //     //         })
        //     //     };
        //     // });
        //
        //     // jest.mock('../src/services/GitService', () => {
        //     //     return jest.fn(() => {
        //     //         getAll: jest.fn().mockImplementation(() => {
        //     //             return {async getAll(){
        //     //                 return {
        //     //                     data: [{
        //     //                         user: 'jondoe',
        //     //                         repo: 'repo-finder-123',
        //     //                         repoName: 'repo-finder',
        //     //                         commitsId: '123',
        //     //                         id: 23,
        //     //                         url: 'someurl.com',
        //     //                         state: 'open'
        //     //                     }]
        //     //                 }
        //     //                 }};
        //     //         });
        //     //     });
        //     // });
        //
        //     // jest.mock('aws-sdk', () => {
        //     //     return {
        //     //         DynamoDB: jest.fn(() => ({
        //     //             DocumentClient: jest.fn(() => (dynamoInstance))
        //     //         }))
        //     //     };
        //     // });
        //
        //     // const gitService = new GitService();
        //     // jest.spyOn(gitService, 'getAll',).mockImplementation(async () => {
        //     //     return {
        //     //         data: [{
        //     //             user: 'jondoe',
        //     //             repo: 'repo-finder-123',
        //     //             repoName: 'repo-finder',
        //     //             commitsId: '123',
        //     //             id: 23,
        //     //             url: 'someurl.com',
        //     //             state: 'open'
        //     //         }]
        //     //     } as AxiosResponse<any>
        //     // });
        //     // const prService = new PullRequestService();
        //
        //     // jest.spyOn(prService, 'put',).mockImplementation(async () => {
        //     //     return [];
        //     // });
        //
        //     // jest.spyOn(prService, 'query',).mockImplementation(async () => {
        //     //     return [{
        //     //         user: 'jondoe',
        //     //         repo: 'repo-finder-123',
        //     //         repoName: 'repo-finder',
        //     //         commitsId: '123',
        //     //         id: 23,
        //     //         url: 'someurl.com',
        //     //         state: 'open'
        //     //     }] as Array<PullRequestItem>
        //     // });
        //
        //     GitService.mockImplementation(() => {
        //         return {
        //             getAll: function(){
        //                 throw new Error('Test error');
        //             }
        //         }
        //     })
        // });

        let updateMocked: jest.Mock;
        let updatePromiseMocked: jest.Mock;

        beforeEach(() => {
            updateMocked = jest.fn();
            updatePromiseMocked = jest.fn();

            updateMocked.mockReturnValue({
                promise: updatePromiseMocked,
            });

            mocked(AWS.DynamoDB.DocumentClient).mockImplementation(() => {
                return {query: updateMocked} as unknown as AWS.DynamoDB.DocumentClient;
            });
        });
        it('should return a valid pull requests response', async () => {
            mockedAxios.get.mockResolvedValue({data: []});
            const updatedItem = {};

            const service = new PullRequestService();
            updatePromiseMocked.mockResolvedValue(updatedItem);
            const response = await service.getAll({user: 'buglabs', repo: 'node-xml2json'});

            console.log('response', response);
            expect(response).toEqual({});
        });
    });


// describe('when user and repo are valid values', () => {
//     it('should return a valid pull requests response', async () => {
//         const service = new PullRequestService();
//         const response = await service.getAll({user: 'buglabs', repo: 'node-xml2json'});
//         // console.log('response', response)
//         expect(response[0].id).toBeDefined();
//     });
// });

// describe('when user and repo are invalid values', () => {
//     it('should throw an error', async () => {
//         const service = new PullRequestService();
//         try {
//             await service.getAll({user: 'buglabs', repo: 'node-xml2jsona'});
//         } catch (e) {
//             expect(e.message).toBe('Request failed with status code 404');
//         }
//     });
// });
});