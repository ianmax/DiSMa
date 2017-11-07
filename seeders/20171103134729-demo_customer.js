'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Customers', [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@doe.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'James',
        last_name: 'Keegan',
        email: 'james@mail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Chris',
        last_name: 'Fox',
        email: 'chris@mail.com',
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
