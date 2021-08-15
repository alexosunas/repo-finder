import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({
    name: 'commits'
})

export class Commit extends BaseEntity {
    constructor() {
        super();
        this.id = 0;
        this.author = '';
        this.message = '';
        this.url = '';
    }

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    author: string;

    @Column({type: 'text'})
    message: string;

    @Column()
    url: string;
}