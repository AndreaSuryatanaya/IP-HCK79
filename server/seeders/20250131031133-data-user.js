"use strict";
const fs = require("fs");
const { PassThrough } = require("stream");
const { hashPassword } = require("../helpers/hashPassword");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const data = JSON.parse(fs.readFileSync("./data/user.json")).map((el) => {
      delete el.id;
      el.password = hashPassword(el.password);
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Users", data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */

    await queryInterface.bulkDelete("Users", null, {});
  },
};
