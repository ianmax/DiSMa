'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email:
    {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    ItemId: DataTypes.INTEGER
  })
  Supplier.associate = function(model){
    Supplier.belongsTo(model.Item)
    Supplier.hasMany(model.Supplier_item)
    Supplier.hasMany(model.Supplier_history)
    Supplier.belongsToMany(model.Item,{through: 'Supplier_item'})
  }
  return Supplier;
};
