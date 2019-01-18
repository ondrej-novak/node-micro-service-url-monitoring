"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const monitoredEndpointDBService_1 = require("../services/monitoredEndpointDBService");
const monitoredService_1 = require("../services/monitoredService");
class MonitoredEndpointController {
    initialize(httpServer) {
        httpServer.get('/endpoints', this.list.bind(this));
        httpServer.get('/endpoints/:id', this.getById.bind(this));
        httpServer.post('/endpoints', this.create.bind(this));
        httpServer.put('/endpoints/:id', this.update.bind(this));
        httpServer.del('/endpoints/:id', this.remove.bind(this));
    }
    async list(req, res) {
        res.send(await monitoredEndpointDBService_1.monitoredEndpointDBService.list());
    }
    async getById(req, res) {
        const endpoint = await monitoredEndpointDBService_1.monitoredEndpointDBService.getById(req.params.id);
        res.send(endpoint ? 200 : 404, endpoint);
    }
    async create(req, res) {
        // create new enpoint - store it into DB
        const tempItem = req.body;
        await monitoredEndpointDBService_1.monitoredEndpointDBService.create(tempItem).then((endpoint) => {
            // add monitoring task into  call monitoring service to start add endpoint into monitoring queue
            if (!endpoint || !endpoint.id) {
                res.send(500, new Error("Endpoint was't created!"));
            }
            if (endpoint) {
                monitoredService_1.monitoredService.addTask(endpoint);
                res.send(endpoint);
            }
        }).catch(err => {
            res.send(500, new Error(err));
        });
    }
    async update(req, res) {
        // update enpoint store it into DB
        const endpoint = await monitoredEndpointDBService_1.monitoredEndpointDBService.update(Object.assign({}, req.body, { id: req.params.id }));
        // update task
        if (endpoint && typeof endpoint != 'undefined') {
            monitoredService_1.monitoredService.addTask(endpoint);
        }
        res.send(endpoint);
    }
    async remove(req, res) {
        try {
            // remove endpoint
            await monitoredEndpointDBService_1.monitoredEndpointDBService.delete(req.params.id);
            // remove task
            monitoredService_1.monitoredService.removeTask(req.params.id);
            res.send(204);
        }
        catch (e) {
            res.send(500);
        }
    }
}
exports.MonitoredEndpointController = MonitoredEndpointController;
//# sourceMappingURL=monitoredEndpoint.js.map