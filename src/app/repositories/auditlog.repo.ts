import {Op, Sequelize} from "sequelize";

export class AuditLogRepository {
    public auditLog;

    constructor(sequelize: Sequelize) {
        this.auditLog = sequelize.models.AuditLog;
    }

    async list(filters: object = {}, offset: number = 0, limit: number = 10) {
        let query: Array<any> = [];

        console.log(filters);
        if ("user_id" in filters && filters.user_id !== undefined) {
            query.push({user_id: filters.user_id});
        }
        if ("transaction_id" in filters && filters.transaction_id !== undefined) {
            query.push({transaction_id: filters.transaction_id});
        }
        return await this.auditLog.findAndCountAll({
            where: (query.length > 0) ? {
                [Op.or]: query
            } : {},
            offset,
            limit,
            order: [['created_at', 'DESC']],
        });
    }

    async create(data: Omit<any, any>) {
        return await this.auditLog.create(data);
    }

    async destroy(transaction_id: string) {
        await this.auditLog.destroy({where: {transaction_id: transaction_id}});
    }
}
