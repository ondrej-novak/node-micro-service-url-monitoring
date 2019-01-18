import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { MonitoredEndpoint } from "./monitoredEndpoint";

@Entity("monitoringResult")
export class MonitoringResult {
    
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({name: "last_check", default: () => `now()` })
    public lastCheck: Date;

    @Column()
    public status: number;

    @Column({type: "nvarchar", length: "MAX"})
    public payload: string;
    
    @ManyToOne(type => MonitoredEndpoint, monitoredEndpoint => monitoredEndpoint.id)
    public monitoredEndpointId: MonitoredEndpoint
}