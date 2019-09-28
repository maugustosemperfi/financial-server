import Sequelize, { Model } from 'sequelize';

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        type: Sequelize.INTEGER,
        balance: Sequelize.DECIMAL,
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
    this.hasOne(models.Record, { foreignKey: 'account_id', sourceKey: 'id' });
  }
}

export default Account;
