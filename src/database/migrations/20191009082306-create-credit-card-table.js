module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('credit_cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      limit: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      cycle_day: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      due_day: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      bank_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'banks',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
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
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'cascade',
        allowNull: false,
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
    return queryInterface.dropTable('credit_cards');
  },
};
