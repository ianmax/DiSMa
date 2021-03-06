let express = require('express')
let router = express.Router()
let model = require('../models')
const convertToRupiah = require('../helper/rupiah');
const sendemail = require('../helper/sendEmail');
let formatCurrency = require('format-currency');
let opts = { format: '%s%v', symbol: 'IDR ' };

// Login validation
router.use(function(req,res,next){
  if(req.session.role === 'admin'){
    next()
  }
  else{
    res.render('login',{session:req.session.username,errMsg:''})
  }
})

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
  model.Supplier_history.findAll(
    {
      include: [model.Item,model.Supplier],
      where: {ItemId: req.params.id}
    }
  ).then(function(rowsSupplierHistories){
    sendemail(rowsSupplierHistories[0].Item.item_name,rowsSupplierHistories[0].Supplier.email, (log) =>{
      model.Item.findAll().then(function(rowsItems){
        model.Customer.findAll(
          {
            where: {id: req.params.id}
          }
        ).then(function(rowsCustomers){
          res.render('marketplaceItems',
          {
            log: log,
            dataJsonItems: rowsItems,
            dataJsonCustomers: rowsCustomers,
            pageTitle: 'DiSMa: Purchase Order Page'
          })
        })
      })
    })
  })
})

module.exports = router
