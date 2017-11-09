module.exports = function(pass,sal){
  let crypto = require('crypto');
  let salt = sal;
  let hash = crypto.createHmac('sha256', salt).update(pass).digest('hex');
  return hash
}
