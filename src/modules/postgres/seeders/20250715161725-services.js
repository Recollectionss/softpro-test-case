'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('services', [
      {
        id: 'c0ae9840-bd05-40af-9bf8-f83e22090654',
        name: 'Couch Course',
        description: 'Yeaaaa',
        duration: 20,
        price: 99999,
        userId: '91990d18-080c-4e31-9854-ce85d6d08710',
      },
      {
        id: '70d8593a-2681-4d01-9b0e-bf9e24a647f9',
        name: 'Trained your aim',
        description: 'Be a new Simple',
        duration: 90,
        price: 1,
        userId: '91990d18-080c-4e31-9854-ce85d6d08710',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
