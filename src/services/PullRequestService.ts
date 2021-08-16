import GitService from "./GitService";
import Service from "./Service";
import {PullRequestItem} from "../types/PullRequestTypes"

export default class PullRequestService extends Service<PullRequestItem> {
    constructor(private gitService: GitService = new GitService()) {
        super('pullRequestsTable');
    }

    async getAll(pathParameters) {
        const url = `https://api.github.com/repos/${pathParameters.user}/${pathParameters.repo}/pulls`;
        const res = await this.gitService.getAll(url);

        const Promises = res.data.map(pullRequest => {
            const {id, url, state, number} = pullRequest;
            return this.put({
                user: pathParameters.user,
                repo: `${pathParameters.repo}-${id}`,
                repoName: pathParameters.repo,
                commitsId: number,
                id,
                url,
                state
            } as PullRequestItem);
        });
        await Promise.all(Promises);
        const x = <Array<PullRequestItem>>await this.query(
            {':user': pathParameters.user},
            {'#user': 'user',},
            '#user = :user'
        );

        console.log('XXX', x);

        return x;
    }
}