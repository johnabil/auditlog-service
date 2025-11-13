import {Sequelize} from "sequelize";

export class AuditLogRepository {
    public auditLog;

    constructor(sequelize: Sequelize) {
        this.auditLog = sequelize.models.AuditLog;
    }

    async list(filters: object = {}) {
        return await this.auditLog.findAll();
    }

    async create(data: Omit<any, any>) {
        return await this.auditLog.create(data);
    }

    async destroy(transaction_id: string) {
        await this.auditLog.destroy({where: {transaction_id: transaction_id}});
    }
}
