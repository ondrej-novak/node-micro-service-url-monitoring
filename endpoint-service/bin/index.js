"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const index_1 = require("./server/index");
const index_2 = require("./database/index");
var dbport = 3306;
var port = 3001;
// if (typeof(process.env.DATABASE_PORT)!=='undefined')
//     dbport = +process.env.DATABASE_PORT;
// if (typeof(process.env.PORT)!=='undefined')
//     port = +process.env.PORT;
index_2.DatabaseProvider.configure({
    type: process.env.DATABASE_TYPE || 'mysql',
    database: process.env.DATABASE_NAME || 'endpointstoque',
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '123456AAA',
    host: process.env.DATABASE_HOST || 'localhost',
    port: dbport
});
const server = new index_1.ApiServer();
server.start(port);
//# sourceMappingURL=index.js.map