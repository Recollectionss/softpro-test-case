'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 'd0e7afe8-e202-4883-949f-cccb1c77dbb9',
        email: 'client@gmail.com',
        password:
          '$2b$10$EJSDk3dsOPrCvT1yB51MluSW.g9V0xT4asbvqlMSbLJR7oWFfr/Am',
        type: 'client',
      },
      {
        id: '91990d18-080c-4e31-9854-ce85d6d08710',
        email: 'provider@gmail.com',
        password:
          '$2b$10$vO9y0ckCwOxXNc8UNEPWm.fZYwt0rsq9kW/uMjxEbRXttcuJGbqai',
        type: 'provider',
      },
    ]);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', [
      {
        id: 'd0e7afe8-e202-4883-949f-cccb1c77dbb9',
      },
      {
        id: '91990d18-080c-4e31-9854-ce85d6d08710',
      },
    ]);
  },
};
