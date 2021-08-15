declare module 'repo-finder' {
    export type PullRequestParameters = {
        user: string,
        repo: string
    }

    export type CommitParameters = {
        url: string
    }
}