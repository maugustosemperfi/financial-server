import Sequelize, { Model } from 'sequelize';
import fileserver_util from '../util/fileserver_util';

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
            return `${fileserver_util.imagesUrl}${this.iconName}.png`;
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
