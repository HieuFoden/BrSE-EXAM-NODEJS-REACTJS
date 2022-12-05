'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // 1 user -> n order         1 group -> n user
    // 1 order -> 1 user         1 user -> 1 group

    static associate(models) {
      Order.belongsTo(models.User);
      Order.belongsToMany(models.Product, { through: 'Order_Detail' });
    }
  };
  Order.init({
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};