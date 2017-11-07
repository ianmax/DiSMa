'use strict';
module.exports = (sequelize, DataTypes) => {
  var Customer = sequelize.define('Customer', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email:
    {
      type: DataTypes.STRING,
      validate : {
        isEmail: true
      }
    }
  })
  Customer.associate = function(model){
    Customer.hasMany(model.Customer_item)
    Customer.hasMany(model.Customer_history)
    Customer.belongsToMany(model.Item,{through:'Customer_item'})
  }
  return Customer;
};
