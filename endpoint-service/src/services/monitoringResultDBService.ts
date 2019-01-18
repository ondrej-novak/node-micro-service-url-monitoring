import {DatabaseProvider} from '../database'
import {MonitoringResult} from '../models/monitoringResult'

export class MonitoringResultDBService {
    
    public async getById(id: number): Promise<MonitoringResult|undefined> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(MonitoringResult).findOne(id);
    }

    public async create(mresult: MonitoringResult): Promise<MonitoringResult> {                      

        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(MonitoringResult).save(mresult);
    }

    public async list(): Promise<MonitoringResult[]|undefined[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(MonitoringResult).find();
    }
}

export const monitoringResultDBService = new MonitoringResultDBService();