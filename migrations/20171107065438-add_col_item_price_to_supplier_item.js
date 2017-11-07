'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Supplier_items',
      'item_price',
      {
        type: Sequelize.INTEGER
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Supplier_items',
      'item_price'
    )
  }
};
