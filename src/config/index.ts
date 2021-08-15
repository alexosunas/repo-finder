import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import {ConnectionOptions} from "typeorm";

export const SECRET_ARN = process.env.DATA_API_SECRET_ARN;
export const RESOURCE_ARN = process.env.DATA_API_RDS_ARN;
export const DATA_API_DB = process.env.DATA_API_DB;

export const dbConfig: ConnectionOptions = {
    name: `aurora-data-api-connection_${DATA_API_DB}`,
    type: 'aurora-data-api',
    database: DATA_API_DB,
    secretArn: SECRET_ARN,
    resourceArn: RESOURCE_ARN,
    region: 'us-east-1',
    synchronize: true,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    // migrations: [
    //     'migrations/type-orm/**/*.js'
    // ],
    formatOptions: {
        // additional format options to pass to the Data API client
        castParameters: true,
    }
};