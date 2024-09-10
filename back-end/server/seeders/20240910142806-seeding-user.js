'use strict';

const { passwordHash } = require('../helper/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: "admin",
        password: passwordHash("123"),
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date()

      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
