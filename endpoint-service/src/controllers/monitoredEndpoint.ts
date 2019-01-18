import { Controller } from './controller';
import { HttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { monitoredEndpointDBService } from '../services/monitoredEndpointDBService';
import { monitoredService } from '../services/monitoredService'
import { MonitoredEndpoint } from '../models/monitoredEndpoint';

export class MonitoredEndpointController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/endpoints', this.list.bind(this));
        httpServer.get('/endpoints/:id', this.getById.bind(this));
        httpServer.post('/endpoints', this.create.bind(this));
        httpServer.put('/endpoints/:id', this.update.bind(this));
        httpServer.del('/endpoints/:id', this.remove.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await monitoredEndpointDBService.list());
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const endpoint = await monitoredEndpointDBService.getById(req.params.id);
        res.send(endpoint ? 200 : 404, endpoint);
    }

    private async create(req: Request, res: Response): Promise<void> {
        // create new enpoint - store it into DB
        const tempItem : MonitoredEndpoint = req.body;
        await monitoredEndpointDBService.create(tempItem).then((endpoint)=>{
            // add monitoring task into  call monitoring service to start add endpoint into monitoring queue
            if (!endpoint || !endpoint.id){
                res.send(500, new Error("Endpoint was't created!")); 
            }

            if (endpoint){
                monitoredService.addTask(endpoint);
                res.send(endpoint);
            }
        }).catch(err =>{
            res.send(500, new Error(err)); 
        });                   
    }

    private async update(req: Request, res: Response): Promise<void> {
        // update enpoint store it into DB
        const endpoint = await monitoredEndpointDBService.update({...req.body, id: req.params.id}); 

        // update task
        if (endpoint && typeof endpoint != 'undefined'){
            monitoredService.addTask(endpoint);
        }
        res.send(endpoint);
    }

    private async remove(req: Request, res: Response): Promise<void> {
        try {
            // remove endpoint
            await monitoredEndpointDBService.delete(req.params.id);
            // remove task
            monitoredService.removeTask(req.params.id);
            res.send(204);
        }
        catch (e) {
            res.send(500);
        }
    }
}