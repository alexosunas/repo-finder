import Service from "./Service";
import {CommitItemType} from "../types/CommitTypes";
import GitService from "./GitService";

export default class PullRequestService extends Service<CommitItemType> {
    private gitService;

    constructor() {
        super('commitsTable');
        this.gitService = new GitService();
    }

    async getAll(pathParameters): Promise<Array<CommitItemType>> {
        const {user, repo, commitId} = pathParameters;
        const url = `https://api.github.com/repos/${user}/${repo}/pulls/${commitId}/commits`;
        const res = await this.gitService.getAll(url);
        const promises = res.data.map(commit => {
            return this.put({
                user,
                repo: `${repo}-${commitId}-${commit.sha}`,
                commitId,
                author: commit.commit.author.name,
                message: commit.commit.message
            } as CommitItemType);
        });
        await Promise.all(promises);
        return <Array<CommitItemType>>await this.query(
            {':user': pathParameters.user, ':repo': `${repo}-${commitId}`},
            {'#user': 'user', '#repo': 'repo'},
            `#user = :user AND begins_with(#repo, :repo)`
        );

    }
}