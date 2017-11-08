'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Customer_histories',
      'item_price_supplied',
      {
        type: Sequelize.INTEGER
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Customer_histories',
      'item_price_supplied'
    )
  }
};
