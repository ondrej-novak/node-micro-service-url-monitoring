import { Connection, createConnection } from 'typeorm';
import { User } from '../models/user';


export interface DatabaseConfiguration {
    type: 'mysql';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    ssl?: boolean;
}

export class DatabaseProvider {
    private static connection: Connection;
    private static configuration: DatabaseConfiguration;

    public static configure(databaseConfiguration: DatabaseConfiguration): void {
        DatabaseProvider.configuration = databaseConfiguration;
    }

    public static async getConnection(): Promise<Connection> {
        if (DatabaseProvider.connection) {
            return DatabaseProvider.connection;
        }

        if (!DatabaseProvider.configuration) {
            throw new Error('DatabaseProvider is not configured yet.');
        }

        const { type, host, port, username, password, database, ssl } = DatabaseProvider.configuration;
        DatabaseProvider.connection = await createConnection(
            {
                type: type,
                host: host,
                port: port,
                username: username,
                password: password,
                database: database,
                synchronize: true,             
                entities: [                    
                    User
                ]
            }
        ); // as any to prevent complaining about the object does not fit to MongoConfiguration, which we won't use here

        return DatabaseProvider.connection;
    }
}