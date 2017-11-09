let express = require('express')
let router = express.Router()
let model = require('../models')

// Log out session
router.get('/',function(req,res){
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
