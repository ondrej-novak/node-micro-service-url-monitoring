import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./user";

@Entity()
export class MonitoredEndpoint {
    
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true })
    public name: string;

    @Column({ unique: true })
    public url: string;

    @Column({name: 'created_at', default: () => `now()`})
    public createdAt: Date;

    @Column({name: "updated_at", nullable: true })
    public updatedAt: Date;

    @Column({name: "last_check", nullable: true })
    public lastCheck: Date;

    @Column()
    public monitoredInterval: number;

    @Column({name: "is_running" })
    public isRunning: boolean;
    
    @ManyToOne(type => User, user => user.monitoredEndpoint)
    public user: User;
    
}