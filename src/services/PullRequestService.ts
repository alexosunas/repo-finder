const axios = require('axios');

export default class PullRequestService {
    async getAll(pathParameters) {
        const url = `https://api.github.com/repos/${pathParameters.user}/${pathParameters.repo}/pulls`;
        const res = await axios.get(url, {
            headers: {'Accept': 'application/vnd.github.v3+json'},
        });
        return res.data;
    }
}