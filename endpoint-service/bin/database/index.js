"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const monitoredEndpoint_1 = require("../models/monitoredEndpoint");
const user_1 = require("../models/user");
const monitoringResult_1 = require("../models/monitoringResult");
class DatabaseProvider {
    static configure(databaseConfiguration) {
        DatabaseProvider.configuration = databaseConfiguration;
    }
    static async getConnection() {
        if (DatabaseProvider.connection) {
            return DatabaseProvider.connection;
        }
        if (!DatabaseProvider.configuration) {
            throw new Error('DatabaseProvider is not configured yet.');
        }
        const { type, host, port, username, password, database, ssl } = DatabaseProvider.configuration;
        DatabaseProvider.connection = await typeorm_1.createConnection({
            type: type,
            host: host,
            port: port,
            username: username,
            password: password,
            database: database,
            synchronize: true,
            entities: [
                monitoredEndpoint_1.MonitoredEndpoint,
                monitoringResult_1.MonitoringResult,
                user_1.User
            ]
        }); // as any to prevent complaining about the object does not fit to MongoConfiguration, which we won't use here
        return DatabaseProvider.connection;
    }
}
exports.DatabaseProvider = DatabaseProvider;
//# sourceMappingURL=index.js.map