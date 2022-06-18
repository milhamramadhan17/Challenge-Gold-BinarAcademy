'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Items', [{
      product: 'Mama suka',
      price: 1500,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  }
};
