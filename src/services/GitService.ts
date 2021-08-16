import axios from 'axios';

export default class GitService {
    constructor(
        private header: Record<string, any> = {'Accept': 'application/vnd.github.v3+json'}
    ) {
    }

    async getAll(url: string) {
        return await axios.get(url, {
            headers: {...this.header}
        })
    }
}