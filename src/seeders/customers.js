"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Customers", [
      {
        first_name: "John",
        last_name: "Doe",
        email: "example@example.com",
        password: "123456",
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Customers", null, {});
  },
};
