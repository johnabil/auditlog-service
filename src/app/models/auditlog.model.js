'use strict';
const {
  Model, DataTypes
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AuditLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  AuditLog.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: DataTypes.INTEGER,
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

  return AuditLog;
};
