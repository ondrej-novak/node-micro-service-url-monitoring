import { User } from '../models/user';
import { DatabaseProvider } from '../database';

class UserService {

    public async getById(id: number): Promise<User> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(User).findOne(id);
    }

    public async create(user: User): Promise<User> {
        const newUser = new User();
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.accessToken = user.accessToken;
        newUser.monitoredEndpoint = user.monitoredEndpoint;           

        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(User).save(newUser);
    }

    public async list(): Promise<User[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(User).find();
    }

    public async update(user: User): Promise<User> {
        console.log(user);
        const connection = await DatabaseProvider.getConnection();
        const repository = connection.getRepository(User);
        const userToModify = await repository.findOne(user.id);        
        userToModify.name = user.name;
        userToModify.email = user.email;
        userToModify.accessToken = user.accessToken;
        userToModify.monitoredEndpoint = user.monitoredEndpoint;       

        return await repository.save(userToModify);
    }

    public async delete(id: number): Promise<void> {
        const connection = await DatabaseProvider.getConnection();
        const item = await connection.getRepository(User).findOne(id);
        await connection.getRepository(User).remove(item);        
    }
}

export const userService = new UserService();