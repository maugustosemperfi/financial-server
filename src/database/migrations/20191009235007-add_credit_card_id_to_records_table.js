module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('records', 'credit_card_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'credit_cards',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('records', 'credit_card_id');
  },
};
