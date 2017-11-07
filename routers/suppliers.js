let express = require('express')
let router = express.Router()
let model = require('../models')

// List all suppliers
router.get('/',function(req,res){
  model.Supplier.findAll().then(function(rows){
    res.render('suppliers',{dataJsonSuppliers:rows})
  })
})

// Get "add supplier" page
router.get('/add',function(req,res){
  res.render('addSuppliers')
})

// Post added supplier
router.post('add',function(req,res){
  model.Supplier.create(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ).then(function(){
    res.redirect('/suppliers')
  }).catch(function(err){
    res.render('addSuppliers',{error:err})
  })
})

// Get "edit supplier" page
router.get('/edit/:id',function(req,res){
  model.Supplier.findAll(
    {
      where: {id: req.params.id}
    }
  ).then(function(rows){
    res.render('editSuppliers',{dataJsonSuppliers:rows})
  })
})

// Post edited supplier
router.post('/edit/:id',function(req,res){
  model.Supplier.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    },
    {
      where: {id: req.params.id}
    }
  ).then(function(){
    res.redirect('/suppliers')
  }).catch(function(err){
    model.Supplier.findAll(
      {
        where: {id: req.params.id}
      }
    ).then(function(rows){
      res.render('editSuppliers',{error:err,dataJsonSuppliers:rows})
    })
  })
})

// Delete suppliers by id
router.get('/delete/:id',function(req,res){
  mode.Supplier.destroy(
    {
      where: {id: req.params.id}
    }
  ).then(function(){
    res.redirect('/suppliers')
  })
})

module.exports = router
