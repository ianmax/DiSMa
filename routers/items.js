let express = require('express')
let router = express.Router()
let model = require('../models')
const convertToRupiah = require('../helper/rupiah');

// List all items
router.get('/',function(req,res){
  model.Item.findAll().then(function(rows){
    res.render('items',{dataJsonItems:rows, pageTitle: 'DiSMa: Items Page'})
  })
})

// Get "add items" page
router.get('/add',function(req,res){
  res.render('addItems', {pageTitle: 'DiSMa: Add Item'})
})

// Post added items
router.post('/add',function(req,res){
  model.Item.create(
    {
      item_qty: req.body.item_qty,
      item_name: req.body.item_name,
      item_price: req.body.item_price,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ).then(function(){
    res.redirect('/items')
  })
})

// Get "edit items" page
router.get('/edit/:id',function(req,res){
  model.Item.findAll(
    {
      where: {id: req.params.id}
    }
  ).then(function(rows){
    res.render('editItems',{dataJsonItems:rows, pageTitle: 'DiSMa: Edit Item'})
  })
})

// Post edited items
router.post('/edit/:id',function(req,res){
  model.Item.update(
    {
      item_qty: req.body.item_qty,
      item_name: req.body.item_name,
      item_price: req.body.item_price
    },
    {
      where: {id: req.params.id}
    }
  ).then(function(){
    res.redirect('/items')
  })
})

// Delete items by id
router.get('/delete/:id',function(req,res){
  model.Item.destroy(
    {
      where: {id: req.params.id}
    }
  ).then(function(){
    res.redirect('/items')
  })
})

// Get "view suppliers" page
router.get('/viewSuppliers/:idItems',function(req,res){
  model.Item.findAll(
    {
      where: {id: req.params.idItems}
    }
  ).then(function(rowsItems){
    model.Supplier.findAll().then(function(rowsSuppliers){
      model.Supplier_history.findAll(
        {
          where: {item_name: rowsItems[0].item_name}
        }
      ).then(function(rowsSuppliersHistories){
        res.render('viewSuppliers',
        {
          dataJsonItems: rowsItems,
          dataJsonSuppliersHistories: rowsSuppliersHistories,
          dataJsonSuppliers: rowsSuppliers,
          pageTitle: 'DiSMa: View Supplier'
        })
      })
    })
  })
})

// Get "view customers" page
router.get('/viewCustomers/:idItems',function(req,res){
  model.Item.findAll(
    {
      where: {id: req.params.idItems}
    }
  ).then(function(rowsItems){
    model.Customer.findAll().then(function(rowsCustomers){
      model.Customer_history.findAll(
        {
          where: {item_name: rowsItems[0].item_name}
        }
      ).then(function(rowsCustomersHistories){
        res.render('viewCustomers',
        {
          dataJsonItems: rowsItems,
          dataJsonCustomersHistories: rowsCustomersHistories,
          dataJsonCustomers: rowsCustomers,
          pageTitle: 'DiSMa: View Customer'
        })
      })
    })
  })
})

module.exports = router
