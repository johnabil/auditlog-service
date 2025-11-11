import type {Sequelize} from "sequelize";
import {DataTypes, Model} from "sequelize";

export class AuditLog extends Model {
    declare id: number;
    declare user_id: number;
    declare transaction_id: string;
    declare action: string;
    declare before: object;
    declare after: object;
    declare created_at: Date;
    declare updated_at: Date;
}

export const initModel = (sequelize: Sequelize) => {
    AuditLog.init({
        id: DataTypes.BIGINT,
        user_id: DataTypes.BIGINT,
        transaction_id: DataTypes.UUIDV4,
        action: DataTypes.STRING,
        before: DataTypes.JSON,
        after: DataTypes.JSON,
    }, {
        sequelize,
        tableName: 'audit_logs',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};
