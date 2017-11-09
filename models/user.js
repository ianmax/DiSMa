'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt: DataTypes.STRING,
    SupplierId: DataTypes.INTEGER,
    CustomerId: DataTypes.INTEGER
  },{
    hooks: {
      beforeCreate: function(userPass){
        let crypto = require('crypto');
        let len = 8
        let result = ''
        let char = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for(let i = 0; i < len; i++){
          result += char.charAt(Math.floor(Math.random() * char.length));
        }
        let salt = result;
        console.log(salt);
        let hash = crypto.createHmac('sha256', salt).update(userPass.password).digest('hex');
        userPass.salt = result
        userPass.password = hash
      }
    }
  })
  User.associate = function(model){
    User.belongsTo(model.Supplier)
    User.belongsTo(model.Customer)
  }
  return User;
};
