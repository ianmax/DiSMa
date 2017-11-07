'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Items', [
      {
        item_qty: 100,
        item_name: 'Iphone X',
        item_price: 10000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        item_qty: 200,
        item_name: 'Samsung Galaxy Z',
        item_price: 5000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        item_qty: 150,
        item_name: 'Xiaomimi Cucu',
        item_price: 1500000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
