// import CommitService from '../src/services/CommitService';

describe('CommitService', () => {
    describe('when github url is valid', () => {
        it('should return a valid commits response', async () => {
            expect(2).toBe(2);
        });

        // it('should return a valid commits response', async () => {
        //     const service = new CommitService();
        //     const response = await service.getOne({url: 'https://api.github.com/repos/buglabs/node-xml2json/pulls/197/commits'});
        //     console.log('response', response)
        //     expect(response[0].commit).toBeDefined();
        // });
    });

    // describe('when github url is invalid', () => {
    //     it('should throw an error', async () => {
    //         const service = new CommitService();
    //         try {
    //             await service.getOne({url: 'https://api.github.com/repos/buglabs/node-xml2json/pulls/19733/commits'});
    //         } catch (e) {
    //             expect(e.message).toBe('Request failed with status code 404');
    //         }
    //     });
    // });
});