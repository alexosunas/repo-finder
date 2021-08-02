import PullRequestService from '../src/services/PullRequestService';

describe('PullRequestService', () => {
    describe('when user and repo are valid values', () => {
        it('should return a valid pull requests response', async () => {
            const service = new PullRequestService();
            const response = await service.getAll({user: 'buglabs', repo: 'node-xml2json'});
            // console.log('response', response)
            expect(response[0].id).toBeDefined();
        });
    });

    describe('when user and repo are invalid values', () => {
        it('should throw an error', async () => {
            const service = new PullRequestService();
            try {
                await service.getAll({user: 'buglabs', repo: 'node-xml2jsona'});
            } catch (e) {
                expect(e.message).toBe('Request failed with status code 404');
            }
        });
    });
});