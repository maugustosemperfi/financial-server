module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('categories', 'default', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('default');
  },
};
