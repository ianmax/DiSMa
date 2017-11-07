'use strict';
module.exports = (sequelize, DataTypes) => {
  var Customer_history = sequelize.define('Customer_history', {
    item_name: DataTypes.STRING,
    item_qty_buyed: DataTypes.INTEGER,
    item_price: DataTypes.INTEGER,
    CustomerId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER
  })
  Customer_history.associate = function(model){
    Customer_history.belongsTo(model.Customer)
    Customer_history.belongsTo(model.Item)
  }
  return Customer_history;
};
