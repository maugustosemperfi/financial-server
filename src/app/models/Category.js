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
        type: Sequelize.INTEGER,
        defaultCategory: {
          type: Sequelize.BOOLEAN,
          field: 'default_category',
        },
      },
      { tableName: 'categories', sequelize, timestamps: false }
    );
  }
}

export default Category;
