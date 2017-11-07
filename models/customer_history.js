'use strict';
module.exports = (sequelize, DataTypes) => {
  var Customer_history = sequelize.define('Customer_history', {
    item_name: DataTypes.STRING,
    item_qty_buyed: DataTypes.INTEGER,
    item_price: DataTypes.INTEGER,
    CustomerId: DataTypes.INTEGER
  })
  Customer_history.associate = function(model){
    Customer_history.belongsTo(model.Customer)
  }
  return Customer_history;
};
