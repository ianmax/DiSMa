'use strict';
module.exports = (sequelize, DataTypes) => {
  var Customer_item = sequelize.define('Customer_item', {
    CustomerId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    qtyBuy: DataTypes.INTEGER
  })
  Customer_item.associate = function(model){
    Customer_item.belongsTo(model.Customer)
    Customer_item.belongsTo(model.Item)
  }
  return Customer_item;
};
