let express = require('express')
let router = express.Router()
let model = require('../models')
let getMatch = require('../helper/getMatch')

// Get "login page"
router.get('/',function(req,res){
  res.render('login')
})

router.post('/',function(req,res){
  model.User.findAll(
    {
      where: {username: req.body.username}
    }
  ).then(function(rowsUsers,error){
    console.log(req.body.username);
    let match = getMatch(req.body.password,rowsUsers[0].salt)
    if(match === rowsUsers[0].password){
      req.session.username = req.body.username
      req.session.role = rowsUsers[0].role
      req.session.SupplierId = rowsUsers[0].SupplierId
      req.session.CustomerId = rowsUsers[0].CustomerId
      if(req.session.role === 'admin'){
        res.redirect('/admins')
      }
      else if(req.session.role === 'customer'){
        res.redirect(`/marketplace/customers/${rowsUsers[0].CustomerId}`)
      }
      else if(req.session.role === 'supplier'){
        res.redirect(`/suppliersOrders/suppliers/${rowsUsers[0].SupplierId}`)
      }
    }
    else{
      res.redirect('login',{errMsg:'',session:req.session.username})
    }
  }).catch(function(err){
    res.render('login',{errMsg:err,session:req.session.username})
  })
})

module.exports = router
