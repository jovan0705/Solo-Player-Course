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
     return queryInterface.bulkInsert('Teachers', [{
      name: 'Bedjo',
      gender: 'Male',
      education: 'S2',
      CourseId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  {
    name: 'Aje',
      gender: 'Male',
      education: 'S3',
      CourseId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
  }, {
    name: 'Tondiki',
    gender: 'Male',
    education: 'S3',
    CourseId: 1,
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
     return queryInterface.bulkDelete('Teachers', null, {});
  }
};
