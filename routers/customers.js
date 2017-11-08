let express = require('express')
let router = express.Router()
let model = require('../models')
const convertToRupiah = require('../helper/rupiah');
const sendemail = require('../helper/sendEmail');

// List all customers
router.get('/', function (req, res) {
  model.Customer.findAll().then(function (rows) {
    res.render('customers', { dataJsonCustomers: rows, pageTitle: 'DiSMa: Customer Page' });
  });
});

// Get "add customers" page
router.get('/add',function(req,res){
  res.render('addCustomers', { pageTitle: 'DiSMa: Add Customer' })
})

// Post added customers
router.post('/add',function(req,res){
  model.Customer.create(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ).then(function(){
    res.redirect('/customers')
  }).catch(function(err){
    res.render('addCustomers',{error:err})
  })
})

// Get "edit customers" page
router.get('/edit/:id',function(req,res){
  model.Customer.findAll(
    {
      where: {id: req.params.id}
    }
  ).then(function(rows){
    res.render('editCustomers',{dataJsonCustomers:rows, pageTitle: 'DiSMa: Edit Customer'})
  })
})

// Post edited customers
router.post('/edit/:id',function(req,res){
  model.Customer.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    },
    {
      where: {id: req.params.id}
    }
  ).then(function(){
    res.redirect('/customers')
  }).catch(function(err){
    model.Customer.findAll(
      {
        where: {id: req.params.id}
      }
    ).then(function(rows){
      res.render('editCustomers',{error:err,dataJsonCustomers:rows})
    })
  })
})

// Delete customers by id
router.get('/delete/:id',function(req,res){
  model.Customer.destroy(
    {
      where: {id: req.params.id}
    }
  ).then(function(){
    res.redirect('/customers')
  })
})

//Send Email
router.get('/sendEmail/:id', (req, res)=>{
  model.Item.findAll(
    {
      where: {id: req.params.id}
    }
  ).then(function(rowsItems){
    let itemName = rowsItems[0].item_name
    sendemail(itemName)
    res.redirect('/items')
  })
})

module.exports = router
