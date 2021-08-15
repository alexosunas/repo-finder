import {Repository, ObjectLiteral} from "typeorm";

export abstract class Service <T> {
    protected constructor(protected repo: Repository<T>) {
    }

    async create<E extends ObjectLiteral>(body: E) {
        return await this.repo.save(body);
    }

    async delete<E extends ObjectLiteral>(criteria: E){
        return await this.repo.delete(criteria);
    }
}