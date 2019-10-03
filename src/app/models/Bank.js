import Sequelize, { Model } from 'sequelize';

class Bank extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        iconName: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Bank;
