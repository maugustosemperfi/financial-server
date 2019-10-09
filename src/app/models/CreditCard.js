import Sequelize, { Model } from 'sequelize';

class CreditCard extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        limit: Sequelize.DECIMAL,
        cycle_day: Sequelize.INTEGER,
        due_day: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Bank, { foreignKey: 'bank_id', as: 'bank' });
    this.belongsTo(models.Account, { foreignKey: 'account_id', as: 'account' });
  }
}

export default CreditCard;
