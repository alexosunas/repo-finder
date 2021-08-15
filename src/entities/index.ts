import "reflect-metadata";
import {BaseEntity, Connection, createConnection, Repository} from "typeorm";
import {dbConfig} from '../config'
import {PullRequest} from './PullRequest';
import {Commit} from "./Commit";

export const entities = {PullRequest, Commit};

let _connection: Connection;

function getFromCache(): Connection {
    return _connection
}

export async function createDataApiConnection(): Promise<Connection> {
    if (!getFromCache()) {
        _connection = <Connection>await createConnection({
            ...dbConfig,
            entities: [
                ...Object.keys(entities).map((key) => entities[key])
            ]
        });
    }

    return _connection
}

export async function closeDataApiConnection(): Promise<void> {
    const connection: Connection = getFromCache();

    if (connection) {
        await connection.close();
        _connection = null;
    }
}

export async function getRepository<T extends BaseEntity>(entityName): Promise<Repository<T>> {
    const Entity = entities[entityName];
    if (!Entity) throw new Error(`Entity ${entityName} not found`);
    await closeDataApiConnection();
    const connection = await createDataApiConnection();
    Entity.useConnection(connection);
    return connection.getRepository(Entity);
}
