import { MonitoringResult } from '../models/monitoringResult'
import { MonitoredEndpoint } from '../models/monitoredEndpoint'
import * as request from "request-promise-native"
import { StringDecoder } from "string_decoder";

export class MonitorScript {

    private defaultInterval: string = '* * * * *';
    private monitoredEndpoint : MonitoredEndpoint = <MonitoredEndpoint>{};

    constructor( monitItem: MonitoredEndpoint){
        this.monitoredEndpoint = monitItem;       
    }

    /**
     * Calculate cron interval from minutes - range <1, 59>
     * @param interval <number[minutes]>
     * @return cron interval <string>
     */
    public calculateCronIntervalStr(interval: number){
        // default interval will be post if number 0, or less                  
        if (interval <= 0){
            return this.defaultInterval; 
        }         
        else if (interval > 59) {
            return '*/59 * * * *';
        }
        else{
            return `*/${interval} * * * *`;
        }            
    }

    /**
     * create response object
     * type<MonitoringResult>
     * @param status 
     * @param payload 
     * @param endpoint 
     */
    private createMonitoringResult = function(status: number, payload: string, endpoint: MonitoredEndpoint){
        const newResult = new MonitoringResult();
        newResult.lastCheck = new Date();
        newResult.status = status;            
        newResult.payload = payload;
        newResult.monitoredEndpointId = endpoint;     
        
        return newResult;
    }   

    /**
    * Do async request GET to endpoint URL, return callback
    **/
    public cronEndpointMonitoring(callback: any): void {

        const that = this;
        const endpoint = this.monitoredEndpoint;
        // request GET options 
        let options = {
            url: endpoint.url,            
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        // call URL request, then return response - if ERR than status 500
        request(options, function (err, res, body){            
            if (err){                
                callback(that.createMonitoringResult( 500, err, endpoint));
            }
            if (res){                         
                callback(that.createMonitoringResult(res.statusCode, JSON.stringify(res.headers), endpoint));
            }                                                                   
        })                 
    }    
}