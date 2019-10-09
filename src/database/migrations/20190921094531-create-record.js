module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      value: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      record_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      account_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'accounts',
          key: 'id',
        },
        onUpdate: 'cascade',
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('records');
  },
};
