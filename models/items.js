'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    static associate(models) {
      Items.belongsTo(models.Orders, {foreignKey: 'id'})
      Items.hasOne(models.Orders, {
        foreignKey: 'id_product',
        as        : 'Orders'
      });
    }
  }
  Items.init({
    product : DataTypes.STRING,
    price   : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Items',
  });
  return Items;
};