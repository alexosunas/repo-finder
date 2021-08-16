import * as AWS from 'aws-sdk';
import IService from "./iService";

export default abstract class Service<T> implements IService<T> {
    private db;


    constructor(private tableName: string) {
        this.db = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})
    }

    async put(item: T) {
        return await this.db.put({TableName: this.tableName, Item: item}).promise();
    }

    async get(criteria) {
        return await this.db.get({TableName: this.tableName, Key: criteria}).promise();
    }

    async query(ExpressionAttributeValues, ExpressionAttributeNames, KeyConditionExpression: string,): Promise<Array<T>>{

        console.log('REachedddddd!!')
        const params = {
            TableName: this.tableName,
            KeyConditionExpression,
            ExpressionAttributeNames,
            ExpressionAttributeValues,
        };

        return this.db.query(params).promise();
    }

}