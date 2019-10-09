import Sequelize, { Model } from 'sequelize';

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        type: Sequelize.INTEGER,
        balance: Sequelize.DECIMAL,
        description: Sequelize.STRING,
        realValue: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Bank, { foreignKey: 'bank_id', as: 'bank' });
  }
}

export default Account;
