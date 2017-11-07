'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    item_qty: DataTypes.INTEGER,
    item_name: DataTypes.STRING,
    item_price: DataTypes.INTEGER
  })
  Item.associate = function(model){
    Item.hasMany(model.Supplier)
    Item.hasMany(model.Customer_item)
    Item.hasMany(model.Supplier_item)
    Item.belongsToMany(model.Customer,{through:'Customer_item'})
    Item.belongsToMany(model.Supplier,{through: 'Supplier_item'})
  }
  return Item;
};
