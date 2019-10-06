import Sequelize, { Model } from 'sequelize';

class Bank extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        iconName: Sequelize.STRING,
        iconUrl: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/icons/bank/${this.iconName}.png`;
          },
        },
      },
      {
        sequelize,
      }
    );
  }
}

export default Bank;
