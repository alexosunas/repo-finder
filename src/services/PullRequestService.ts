import {Repository} from "typeorm";
import {PullRequest} from "../entities/PullRequest";
import {PullRequestParameters} from "repo-finder";
import GitService from "./GitService";
import {Service} from "./Service";


export default class PullRequestService extends Service<PullRequest>{
    constructor(repo: Repository<PullRequest>, private gitService = new GitService()){
        super(repo);

    }

    async getAll(pathParameters: PullRequestParameters) {
        const res = await this.gitService.get(`https://api.github.com/repos/${pathParameters.user}/${pathParameters.repo}/pulls`);
        await this.delete(pathParameters);
        const promises = res.map( (pullRequest) => {
            return this.create({
                id: pullRequest.id,
                commitsUrl: pullRequest.commits_url,
                state: pullRequest.state,
                url: pullRequest.url,
                ...pathParameters
            });
        });
        const repoRes = await Promise.all(promises);
        console.log('repoRes', repoRes);

        return repoRes;
    }
}