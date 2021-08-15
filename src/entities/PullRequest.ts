import {Column, Entity, PrimaryColumn, BaseEntity} from "typeorm";

@Entity({
    name: 'pull_requests'
})
export class PullRequest extends BaseEntity{
    constructor(){
        super();
        this.id = 0;
        this.state = '';
        this.commitsUrl = '';
        this.url = '';
        this.user = '';
        this.repo = '';
    }

    @PrimaryColumn()
    id: number;

    @Column()
    state: string;

    @Column()
    commitsUrl: string;

    @Column()
    url: string;

    @Column()
    user: string;

    @Column()
    repo: string;
}