'use strict';
const faker = require('faker');

const seedArray = [] // you need an array

for (let i = 0; i < 1000; i++) {
    // create new object
  const newObj = {
    name: faker.name.findName(),
    label: faker.company.companyName(),
    genre: faker.music.genre(),
    releaseYear: faker.datatype.number(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  seedArray.push(newObj);
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Albums', seedArray, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Albums', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
