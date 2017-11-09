let express = require('express')
let router = express.Router()
let model = require('../models')

router.get('/', function (req, res) {
  res.render('index', { pageTitle: 'DiSMa: HOME' });
});

// Get "register customer" page
router.get('/registerCustomers',function(req,res){
  res.render('registerCustomers')
})

// Get "register supplier" page
router.get('/registerSuppliers',function(req,res){
  res.render('registerSuppliers')
})

// Get "register admin" page
router.get('/registerAdmins',function(req,res){
  res.render('registerAdmins')
})

// Register Customer
router.post('/registerCustomers',function(req,res){
  model.Customer.create(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ).then(function(){
    model.Customer.findAll().then(function(rowsCustomers){
      let userId = 0
      for(let i = 0; i < rowsCustomers.length; i++){
        userId = rowsCustomers[i].id
      }
      model.User.create(
        {
          username: req.body.username,
          password: req.body.password,
          role: req.body.role,
          CustomerId: userId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ).then(function(){
        res.redirect('/customers')
      })
    })
  })
})

// Register Suppliers
router.post('/registerSuppliers',function(req,res){
  model.Supplier.create(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ).then(function(){
    model.Supplier.findAll().then(function(rowsSuppliers){
      let userId = 0
      for(let i = 0; i < rowsSuppliers.length; i++){
        userId = rowsSuppliers[i].id
      }
      model.User.create(
        {
          username: req.body.username,
          password: req.body.password,
          role: req.body.role,
          SupplierId: userId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ).then(function(){
        res.redirect('/suppliers')
      })
    })
  })
})

// Register admin
router.post('/registerAdmins',function(req,res){
  model.User.create(
    {
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ).then(function(){
    res.redirect('/admins')
  })
})

module.exports = router
