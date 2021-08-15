import {CommitParameters} from "repo-finder";
import {Repository} from "typeorm";
import {Commit} from "../entities/Commit";
import {Service} from "./Service";
import GitService from "./GitService";

export default class CommitService extends Service<Commit> {
    constructor(repo: Repository<Commit>, private gitService = new GitService()) {
        super(repo);
    }

    async getOne(pathParameters: CommitParameters) {
        const res = await this.gitService.get(pathParameters.url);
        await this.delete({url: pathParameters.url});
        const promises = res.map(commit => {
            const test = <Commit>{
                author: commit.commit.author.name,
                message: commit.commit.message,
                url: pathParameters.url,
            };
            return this.create(test)
        });

        return await Promise.all(promises);
    }
}