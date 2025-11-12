import {Sequelize} from "sequelize";

export class AuditLogRepository {
    public auditLog;

    constructor(sequelize: Sequelize) {
        this.auditLog = sequelize.models.AuditLog;
    }

    async list(filters: object = {}) {
        return await this.auditLog.findAll();
    }
}
