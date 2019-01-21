import 'reflect-metadata';
import { ApiServer } from './server/index';
import { DatabaseProvider } from './database/index';

var dbport = 3306;
var port = 8081;
// if (typeof(process.env.DATABASE_PORT)!=='undefined')
//     dbport = +process.env.DATABASE_PORT;

// if (typeof(process.env.PORT)!=='undefined')
//     port = +process.env.PORT;

DatabaseProvider.configure({
    type: process.env.DATABASE_TYPE as any || 'mysql',
    database: process.env.DATABASE_NAME || 'endpointstoque',
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '123456AAA',
    host: process.env.DATABASE_HOST || 'localhost',
    port: dbport
});

const server = new ApiServer();
server.start(port);