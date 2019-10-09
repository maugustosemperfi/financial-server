import Sequelize, { Model } from 'sequelize';

class CreditCard extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        limit: Sequelize.DECIMAL,
        cycleDay: {
          type: Sequelize.INTEGER,
          field: 'cycle_day',
        },
        dueDay: {
          type: Sequelize.INTEGER,
          field: 'due_day',
        },
      },
      { tableName: 'credit_cards', sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Bank, { foreignKey: 'bank_id', as: 'bank' });
    this.belongsTo(models.Account, { foreignKey: 'account_id', as: 'account' });
  }
}

export default CreditCard;
