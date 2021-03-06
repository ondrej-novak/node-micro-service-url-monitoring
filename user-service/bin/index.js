"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var index_1 = require("./server/index");
var index_2 = require("./database/index");
var dbport = 3306;
var port = 8082;
index_2.DatabaseProvider.configure({
    type: process.env.DATABASE_TYPE || 'mysql',
    database: process.env.DATABASE_NAME || 'endpointstoque',
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '123456AAA',
    host: process.env.DATABASE_HOST || 'localhost',
    port: +process.env.DATABASE_PORT || dbport,
    ssl: !!process.env.USE_SSL
});
var server = new index_1.ApiServer();
server.start(+process.env.PORT || 8082);
//# sourceMappingURL=index.js.map