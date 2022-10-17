'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     
    */

    await queryInterface.bulkInsert('User', [{
      email: 'John Doe',
      password: '123',
      username: 'Faker'
    },
    {
      email: 'John Doe1',
      password: '123',
      username: 'Faker1'
    },
    {
      email: 'John Doe2',
      password: '123',
      username: 'Faker2'
    }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
