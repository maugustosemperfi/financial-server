module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('records', 'category_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('records', 'category_id');
  },
};
