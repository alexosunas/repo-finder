const axios = require('axios');

export default class GitService {

    async get(url: string): Promise<(Record<string, any>)[]> {
        const res = await axios.get(url, {
            headers: {'Accept': 'application/vnd.github.v3+json'},
        });
        return res.data;
    }
}