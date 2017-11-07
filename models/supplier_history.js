'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier_history = sequelize.define('Supplier_history', {
    item_name: DataTypes.STRING,
    item_qty_supplied: DataTypes.INTEGER,
    item_price: DataTypes.INTEGER,
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER
  })
  Supplier_history.associate = function(model){
    Supplier_history.belongsTo(model.Supplier)
    Supplier_history.belongsTo(model.Item)
  }
  return Supplier_history;
};
