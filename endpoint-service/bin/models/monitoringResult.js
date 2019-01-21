"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const monitoredEndpoint_1 = require("./monitoredEndpoint");
let MonitoringResult = class MonitoringResult {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MonitoringResult.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: "last_check", default: () => `now()` }),
    __metadata("design:type", Date)
], MonitoringResult.prototype, "lastCheck", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MonitoringResult.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ name: "payload" }),
    __metadata("design:type", String)
], MonitoringResult.prototype, "payload", void 0);
__decorate([
    typeorm_1.ManyToOne(type => monitoredEndpoint_1.MonitoredEndpoint, monitoredEndpoint => monitoredEndpoint.id),
    __metadata("design:type", monitoredEndpoint_1.MonitoredEndpoint)
], MonitoringResult.prototype, "monitoredEndpointId", void 0);
MonitoringResult = __decorate([
    typeorm_1.Entity()
], MonitoringResult);
exports.MonitoringResult = MonitoringResult;
//# sourceMappingURL=monitoringResult.js.map