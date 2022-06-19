'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsTo(models.Orders, { foreignKey: 'id'})
      Users.hasOne(models.Orders, {
        foreignKey: 'id_users',
        as        : 'Orders'
      });
    }
  }
  Users.init({
    firstName : DataTypes.STRING,
    lastName  : DataTypes.STRING,
    email     : DataTypes.STRING,
    pass      : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};