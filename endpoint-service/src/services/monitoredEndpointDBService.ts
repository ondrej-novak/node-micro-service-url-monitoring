import { MonitoredEndpoint } from '../models/monitoredEndpoint';
import { DatabaseProvider } from '../database';

export class MonitoredEndpointDBService {
    
    public async getById(id: number): Promise<MonitoredEndpoint | undefined> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(MonitoredEndpoint).findOne(id);    
    }

    public async create(endpoint: MonitoredEndpoint): Promise<MonitoredEndpoint | undefined> {                

        if (!endpoint){
            return undefined;
        }
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(MonitoredEndpoint).save(endpoint);
    }

    public async list(): Promise<MonitoredEndpoint[] | undefined> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(MonitoredEndpoint).find();
    }

    public async update(endpoint: MonitoredEndpoint): Promise<MonitoredEndpoint | undefined> {
        const connection = await DatabaseProvider.getConnection();
        if (!endpoint) return;

        var item = await connection.getRepository(MonitoredEndpoint).findOne(endpoint.id);
        if (item){
            item.name = endpoint.name;
            item.url = endpoint.url;
            // item.createdAt = endpoint.createdAt; // no need to update
            item.lastCheck = endpoint.lastCheck;
            item.monitoredInterval = endpoint.monitoredInterval;
            item.user = endpoint.user;

            return await connection.getRepository(MonitoredEndpoint).save(item);
        }        
    }

    public async delete(id: number): Promise<void> {
        const connection = await DatabaseProvider.getConnection();
        const item = await connection.getRepository(MonitoredEndpoint).findOne(id);
        if (item){
            await connection.getRepository(MonitoredEndpoint).remove(item);        
        }       

    }

    public async deleteByName(name: string): Promise<void> {
        const connection = await DatabaseProvider.getConnection();
        const item = await connection.getRepository(MonitoredEndpoint).find({'name': name});
        if (item){
            await connection.getRepository(MonitoredEndpoint).remove(item);        
        }
    }
}

export const monitoredEndpointDBService = new MonitoredEndpointDBService();