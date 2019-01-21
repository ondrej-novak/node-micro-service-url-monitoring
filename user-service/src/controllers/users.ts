import { Controller } from './controller';
import { HttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { userService } from '../services/user';

export class UsersController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/users', this.list.bind(this));
        httpServer.get('/users/:id', this.getById.bind(this));
        httpServer.post('/users', this.create.bind(this));        
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await userService.list());
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const user = await userService.getById(req.params.id);
        res.send(user ? 200 : 404, user);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await userService.create(req.body));
    }    

    private async update(req: Request, res: Response): Promise<void> {
        // update enpoint store it into DB
        res.send(await userService.update({...req.body, id: req.params.id})); 
    }
}