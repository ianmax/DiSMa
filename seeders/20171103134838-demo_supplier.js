'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Suppliers', [
      {
        first_name: 'PT Bersama',
        last_name: 'Bahagia',
        email: 'bahagia@ptbersama.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'PT Berlanggeng',
        last_name: 'Selalu',
        email: 'berlanggeng@selalu.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'PT Sejahtera',
        last_name: 'Menanam',
        email: 'sejahtera@menanam.com',
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
