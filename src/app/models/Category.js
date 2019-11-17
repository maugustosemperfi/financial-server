import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        iconName: {
          type: Sequelize.STRING,
          field: 'icon_name',
        },
        iconColor: {
          type: Sequelize.STRING,
          field: 'icon_color',
        },
        type: {
          type: Sequelize.INTEGER,
        },
      },
      { sequelize }
    );
  }
}

export default Category;
