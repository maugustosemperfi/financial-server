import Sequelize, { Model } from 'sequelize';

class CreditCard extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        limit: {
          type: Sequelize.DECIMAL,
          get() {
            // Workaround until sequelize issue https://github.com/sequelize/sequelize/issues/8019 is fixed
            const value = this.getDataValue('limit');
            return value === null ? null : parseFloat(value);
          },
        },
        cycleDay: {
          type: Sequelize.INTEGER,
          field: 'cycle_day',
        },
        dueDay: {
          type: Sequelize.INTEGER,
          field: 'due_day',
        },
        bankId: {
          type: Sequelize.INTEGER,
          field: 'bank_id',
        },
        accountId: {
          type: Sequelize.INTEGER,
          field: 'account_id',
        },
        userId: {
          type: Sequelize.INTEGER,
          field: 'user_id',
        },
        statement: {
          type: Sequelize.VIRTUAL,
        },
      },
      { tableName: 'credit_cards', sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Bank, { foreignKey: 'bank_id', as: 'bank' });
    this.belongsTo(models.Account, { foreignKey: 'account_id', as: 'account' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default CreditCard;
