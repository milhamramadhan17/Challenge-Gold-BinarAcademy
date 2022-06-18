'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.users);
      models.users.hasMany(Orders);
    }
  }
  Orders.init({
    id_users: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orders',
  });

  return Orders;
};