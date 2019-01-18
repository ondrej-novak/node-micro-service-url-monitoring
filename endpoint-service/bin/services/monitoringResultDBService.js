"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const monitoringResult_1 = require("../models/monitoringResult");
class MonitoringResultDBService {
    async getById(id) {
        const connection = await database_1.DatabaseProvider.getConnection();
        return await connection.getRepository(monitoringResult_1.MonitoringResult).findOne(id);
    }
    async create(mresult) {
        const connection = await database_1.DatabaseProvider.getConnection();
        return await connection.getRepository(monitoringResult_1.MonitoringResult).save(mresult);
    }
    async list() {
        const connection = await database_1.DatabaseProvider.getConnection();
        return await connection.getRepository(monitoringResult_1.MonitoringResult).find();
    }
}
exports.MonitoringResultDBService = MonitoringResultDBService;
exports.monitoringResultDBService = new MonitoringResultDBService();
//# sourceMappingURL=monitoringResultDBService.js.map