'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      Orders.belongsTo(models.Items, {foreignKey: 'id_product'})
      Orders.hasOne(models.Items, {
        foreignKey: 'id',
        as        : 'Items'
      });

      Orders.belongsTo(models.Users, { foreignKey: 'id_users'})
      Orders.hasOne(models.Users, {
        foreignKey: 'id',
        as        : 'Users'
      });
    }
  }
  Orders.init({
    id_users  : DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
    qty       : DataTypes.INTEGER,
    amount    : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orders',
  });

  return Orders;
};