import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { MonitoredEndpoint} from "./monitoredEndpoint";

@Entity("user")
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column()
    public accessToken: string;

    @OneToMany(type => MonitoredEndpoint, monitoredEndpoint => monitoredEndpoint.user)
    public monitoredEndpoint: MonitoredEndpoint[];
    
}