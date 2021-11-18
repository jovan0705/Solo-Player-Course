'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('Courses', [{
      name: 'Literature',
      duration: 200,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  {
    name: 'Math',
      duration: 300,
      createdAt: new Date(),
      updatedAt: new Date()
  }, {
    name: 'Bahasa',
      duration: 400,
      createdAt: new Date(),
      updatedAt: new Date()
  }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Courses', null, {});
  }
};
