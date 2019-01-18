"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cron = require("node-cron");
const monitorScript_1 = require("./monitorScript");
const monitoredEndpointDBService_1 = require("./monitoredEndpointDBService");
const monitoringResultDBService_1 = require("./monitoringResultDBService");
// http://handyjs.org/article/the-kick-ass-guide-to-creating-nodejs-cron-tasks
class MonitoredService {
    constructor() {
        /* Set up the object to keep track of the cron system
         * the object will have the format
         * {
         *  taskName: {task: <task> }
         * }
         */
        this.cronRecord = {};
        // public run = function(req, res, callback){
        //     // req and res are the express request and response objects
        //     // set timestamp for when cron is invoked
        //     var now = Date.now();
        //     // set up array to contain cron tasks that are ready to execute
        //     var scheduledTasks = [];
        //     _.forEach(this.cronRecord, function(taskDefinition, taskName){
        //         // check if the task is due
        //         if(taskDefinition['endpoint'] === null || _checkIfTaskIsDue(taskDefinition, now)){
        //             scheduledTasks.push(
        //                 function(asyncCallback){
        //                     taskDefinition.endpoint(asyncCallback);
        //                 }
        //             );
        //         }
        //     });
        //     // if there are tasks due, run them
        //     if(scheduledTasks.length > 0){
        //         async.parallel(scheduledTasks, function(err){
        //             // cron tasks will have run
        //             this.storeRecord();
        //             return callback(err);
        //         });
        //     } else {
        //         // no cron tasks are due
        //         this.storeRecord();
        //         return callback(null);
        //     }
        //     // function to check if a cron task is due to be executed
        //     // returns true if the cron task is due, returns false otherwise
        //     function _checkIfTaskIsDue (monitoredEndpoint: MonitoredEndpoint, invokeTime){
        //         // set default value of lastrun to 0
        //         monitoredEndpoint.dateLastCheck = monitoredEndpoint.dateLastCheck || 0;
        //         // check how long it has been since the last time
        //         // the task was executed
        //         var elapsedTime = invokeTime - monitoredEndpoint.dateLastCheck;
        //         // return true if the elapsed time is greater than or
        //         // equal to the cron frequency 
        //         if(elapsedTime - monitoredEndpoint.monitoredInterval * 1000 >= 0){
        //             return true;
        //         }
        //         // return false otherwise
        //         return false;   
        //     }
        // }
    }
    /**
     * Add tast into cron & run it's monitoring
     * @param endpoint <MonitoredEndpoint>
     * @returns void
     */
    async addTask(endpoint) {
        /* let's check if the taskID already exists.
         * if so, update the properties and rerun task
         */
        let taskUpdate = false;
        let cronTask = this.cronRecord[endpoint.id];
        if (cronTask) {
            // use new endpoint Item and update lastCheck against task             
            endpoint.lastCheck = cronTask.lastCheck;
            // stop and destroy task
            cronTask.destroy();
            taskUpdate = true;
        }
        // initialize monitoring class
        const Script = new monitorScript_1.MonitorScript(endpoint);
        // count cron interval
        // TODO: now possible only 1-59 MINUTE INTERVAL. Modify to full cron interval count;
        var interval = Script.calculateCronIntervalStr(endpoint.monitoredInterval);
        // create Cron task        
        var task = cron.schedule(interval, () => Script.cronEndpointMonitoring(async function (data) {
            console.log(data);
            // update endpoint lastCheck Date
            endpoint.lastCheck = data.lastCheck;
            // set isRunning TRUE;            
            endpoint.isRunning = true;
            // UPDATE endpoint data
            let updated = await monitoredEndpointDBService_1.monitoredEndpointDBService.update(endpoint);
            console.log(`${0} last check ${1}`, updated ? updated.url : "", updated ? updated.lastCheck : '');
            // MySQL create MonitoringResult            
            let created = await monitoringResultDBService_1.monitoringResultDBService.create(data);
            console.log('Monitoring result for ', created.monitoredEndpointId.name);
        }), {
            scheduled: false
        });
        // start Cton task
        this.cronRecord[endpoint.id] = task;
        task.start();
    }
    async stopTask(endpoint) {
        /**find task in this.cronRecord by endpointID
         * then stop task
         * then update endpoint.isRunning = false
         */
        const task = this.cronRecord[endpoint.id];
        if (task) {
            task.stop();
            endpoint.isRunning = false;
        }
        return endpoint;
    }
    async removeTask(endpointID) {
        /**find task in this.cronRecord by endpointID
         * then stop and destroy task
         * then remove task from this.cronRecord
         */
        const task = this.cronRecord[endpointID];
        if (task) {
            task.destroy();
            delete this.cronRecord[endpointID];
        }
    }
}
exports.MonitoredService = MonitoredService;
;
exports.monitoredService = new MonitoredService();
//# sourceMappingURL=monitoredService.js.map