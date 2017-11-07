'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier_item = sequelize.define('Supplier_item', {
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    qtySupply: DataTypes.INTEGER,
    item_price: DataTypes.INTEGER
  })
  Supplier_item.associate = function(model){
    Supplier_item.belongsTo(model.Supplier)
    Supplier_item.belongsTo(model.Item)
  }
  return Supplier_item;
};
