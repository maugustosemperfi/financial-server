import Sequelize, { Model } from 'sequelize';

class Record extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        value: Sequelize.DECIMAL,
        type: Sequelize.INTEGER,
        recordDate: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Account, { foreignKey: 'account_id', as: 'account' });
    this.belongsTo(models.CreditCard, { foreignKey: 'credit_card_id', as: 'creditCard' });
  }
}

export default Record;
