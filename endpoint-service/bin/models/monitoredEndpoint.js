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
const user_1 = require("./user");
let MonitoredEndpoint = class MonitoredEndpoint {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MonitoredEndpoint.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], MonitoredEndpoint.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], MonitoredEndpoint.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({ name: 'created_at', default: () => `now()` }),
    __metadata("design:type", Date)
], MonitoredEndpoint.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ name: "updated_at", nullable: true }),
    __metadata("design:type", Date)
], MonitoredEndpoint.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column({ name: "last_check", nullable: true }),
    __metadata("design:type", Date)
], MonitoredEndpoint.prototype, "lastCheck", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MonitoredEndpoint.prototype, "monitoredInterval", void 0);
__decorate([
    typeorm_1.Column({ name: "is_running" }),
    __metadata("design:type", Boolean)
], MonitoredEndpoint.prototype, "isRunning", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_1.User, user => user.monitoredEndpoint),
    __metadata("design:type", user_1.User)
], MonitoredEndpoint.prototype, "user", void 0);
MonitoredEndpoint = __decorate([
    typeorm_1.Entity()
], MonitoredEndpoint);
exports.MonitoredEndpoint = MonitoredEndpoint;
//# sourceMappingURL=monitoredEndpoint.js.map