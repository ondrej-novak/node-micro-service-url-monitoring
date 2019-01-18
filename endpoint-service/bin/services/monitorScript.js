"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const monitoringResult_1 = require("../models/monitoringResult");
const request = require("request-promise-native");
class MonitorScript {
    constructor(monitItem) {
        this.defaultInterval = '* * * * *';
        this.monitoredEndpoint = {};
        /**
         * create response object
         * type<MonitoringResult>
         * @param status
         * @param payload
         * @param endpoint
         */
        this.createMonitoringResult = function (status, payload, endpoint) {
            const newResult = new monitoringResult_1.MonitoringResult();
            newResult.lastCheck = new Date();
            newResult.status = status;
            newResult.payload = payload;
            newResult.monitoredEndpointId = endpoint;
            return newResult;
        };
        this.monitoredEndpoint = monitItem;
    }
    /**
     * Calculate cron interval from minutes - range <1, 59>
     * @param interval <number[minutes]>
     * @return cron interval <string>
     */
    calculateCronIntervalStr(interval) {
        // default interval will be post if number 0, or less                  
        if (interval <= 0) {
            return this.defaultInterval;
        }
        else if (interval > 59) {
            return '*/59 * * * *';
        }
        else {
            return `*/${interval} * * * *`;
        }
    }
    /**
    * Do async request GET to endpoint URL, return callback
    **/
    cronEndpointMonitoring(callback) {
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
        request(options, function (err, res, body) {
            if (err) {
                callback(that.createMonitoringResult(500, err, endpoint));
            }
            if (res) {
                callback(that.createMonitoringResult(res.statusCode, JSON.stringify(res.headers), endpoint));
            }
        });
    }
}
exports.MonitorScript = MonitorScript;
//# sourceMappingURL=monitorScript.js.map