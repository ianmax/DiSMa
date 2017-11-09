let express = require('express')
let router = express.Router()
let model = require('../models')


let formatCurrency = require('format-currency')
let opts = { format: '%s%v', symbol: 'IDR ' }

// Login validation
router.use(function(req,res,next){
  if(req.session.role === 'admin'){
    next()
  }
  else{
    res.render('login',{session:req.session.username,errMsg:''})
  }
})

// List all items
router.get('/',function(req,res){
  model.Item.findAll().then(function(rows){
    for(let i = 0; i < rows.length; i++){
      rows[i].item_selling_price = formatCurrency(rows[i].item_selling_price,opts)
      rows[i].item_price = formatCurrency(rows[i].item_price,opts)
    }

    res.render('items',{dataJsonItems:rows, pageTitle: 'DiSMa: Items Page',session: req.session})
  })
})

// Get "add items" page
router.get('/add',function(req,res){
  res.render('addItems', {pageTitle: 'DiSMa: Add Item',session: req.session})
})

// Post added items
router.post('/add',function(req,res){
  model.Item.create(
    {
      item_qty: req.body.item_qty,
      item_name: req.body.item_name,
      item_price: req.body.item_price,
      item_selling_price: req.body.item_selling_price,
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
    res.render('editItems',{dataJsonItems:rows, pageTitle: 'DiSMa: Edit Item',session: req.session})
  })
})

// Post edited items
router.post('/edit/:id',function(req,res){
  model.Item.update(
    {
      item_qty: req.body.item_qty,
      item_name: req.body.item_name,
      item_price: req.body.item_price,
      item_selling_price: req.body.item_selling_price
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
          pageTitle: 'DiSMa: View Supplier',
          session: req.session
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
          pageTitle: 'DiSMa: View Customer',
          session: req.session
        })
      })
    })
  })
})

module.exports = router
