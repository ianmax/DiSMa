'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Customer_histories',
      'SupplierId',
      {
        type: Sequelize.INTEGER
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Customer_histories',
      'SupplierId'
    )
  }
};
