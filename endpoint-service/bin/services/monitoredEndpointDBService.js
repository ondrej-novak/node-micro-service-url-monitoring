"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const monitoredEndpoint_1 = require("../models/monitoredEndpoint");
const database_1 = require("../database");
class MonitoredEndpointDBService {
    async getById(id) {
        const connection = await database_1.DatabaseProvider.getConnection();
        return await connection.getRepository(monitoredEndpoint_1.MonitoredEndpoint).findOne(id);
    }
    async create(endpoint) {
        if (!endpoint) {
            return undefined;
        }
        const connection = await database_1.DatabaseProvider.getConnection();
        return await connection.getRepository(monitoredEndpoint_1.MonitoredEndpoint).save(endpoint);
    }
    async list() {
        const connection = await database_1.DatabaseProvider.getConnection();
        return await connection.getRepository(monitoredEndpoint_1.MonitoredEndpoint).find();
    }
    async update(endpoint) {
        const connection = await database_1.DatabaseProvider.getConnection();
        if (!endpoint)
            return;
        var item = await connection.getRepository(monitoredEndpoint_1.MonitoredEndpoint).findOne(endpoint.id);
        if (item) {
            item.name = endpoint.name;
            item.url = endpoint.url;
            // item.createdAt = endpoint.createdAt; // no need to update
            item.lastCheck = endpoint.lastCheck;
            item.monitoredInterval = endpoint.monitoredInterval;
            item.user = endpoint.user;
            return await connection.getRepository(monitoredEndpoint_1.MonitoredEndpoint).save(item);
        }
    }
    async delete(id) {
        const connection = await database_1.DatabaseProvider.getConnection();
        const item = await connection.getRepository(monitoredEndpoint_1.MonitoredEndpoint).findOne(id);
        if (item) {
            await connection.getRepository(monitoredEndpoint_1.MonitoredEndpoint).remove(item);
        }
    }
    async deleteByName(name) {
        const connection = await database_1.DatabaseProvider.getConnection();
        const item = await connection.getRepository(monitoredEndpoint_1.MonitoredEndpoint).find({ 'name': name });
        if (item) {
            await connection.getRepository(monitoredEndpoint_1.MonitoredEndpoint).remove(item);
        }
    }
}
exports.MonitoredEndpointDBService = MonitoredEndpointDBService;
exports.monitoredEndpointDBService = new MonitoredEndpointDBService();
//# sourceMappingURL=monitoredEndpointDBService.js.map