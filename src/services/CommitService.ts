const axios = require('axios');

export default class PullRequestService {
    async getOne(pathParameters) {
        const url = pathParameters.url;
        const res = await axios.get(url, {
            headers: {'Accept': 'application/vnd.github.v3+json'},
        });
        return res.data;
    }
}