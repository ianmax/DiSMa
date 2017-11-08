let express = require('express')
let router = express.Router()
let model = require('../models')

// Get marketplace main page - suppliers
router.get('/suppliers/:id',function(req,res){
  model.Item.findAll().then(function(rowsItems){
    model.Supplier.findAll(
      {
        where: {id: req.params.id}
      }
    ).then(function(rowsSuppliers){
      res.render('suppliersOrders',
      {
        dataJsonItems:rowsItems,
        dataJsonSuppliers:rowsSuppliers,
        pageTitle: 'DiSMa: Supplier Order'
      })
    })
  })
})

// Post add to order based on suppliers id - suppliers
router.post('/suppliers/:idSuppliers/:idItems/addToOrder',function(req,res){
  model.Supplier_item.create(
    {
      SupplierId: req.params.idSuppliers,
      ItemId: req.params.idItems,
      createdAt: new Date(),
      updatedAt: new Date(),
      qtySupply: req.body.qtySupply,
      item_price: req.body.item_price
    }
  ).then(function(){
    res.redirect(`/suppliersOrders/suppliers/${req.params.idSuppliers}`)
  })
})

// Get "view orders" page - suppliers
router.get('/suppliers/:idSuppliers/viewOrders',function(req,res){
  model.Supplier_item.findAll(
    {
      attributes: [
        'id',
        'SupplierId',
        'ItemId',
        'qtySupply',
        'item_price'
      ],
      where: {SupplierId: req.params.idSuppliers}
    }
  ).then(function(rowsSuppliersItems){
    model.Supplier.findAll(
      {
        where: {id: req.params.idSuppliers}
      }
    ).then(function(rowsSuppliers){
      model.Item.findAll().then(function(rowsItems){
        res.render('viewOrders',
        {
          dataJsonSuppliersItems:rowsSuppliersItems,
          dataJsonSuppliers:rowsSuppliers,
          dataJsonItems:rowsItems,
          pageTitle: 'DiSMa: viewOrder Page'
        })
      })
    })
  })
})

// Remove item from orders - suppliers
router.get('/suppliers/:idSuppliers/:idSuppliersItems/delete',function(req,res){
  model.Supplier_item.destroy(
    {
      where: {id: req.params.idSuppliersItems}
    }
  ).then(function(){
    res.redirect(`/suppliersOrders/suppliers/${req.params.idSuppliers}/viewOrders`)
  })
})

// Complete suppliers supply orders - suppliers
router.get('/suppliers/:idSuppliers/completeOrders',function(req,res){
  model.Supplier_item.findAll(
    {
      where: {SupplierId: req.params.idSuppliers},
      include:[model.Item]
    }
  ).then(function(rowsSuppliersItems){
    let dataSuppliersItems = rowsSuppliersItems
    for(let i = 0; i < dataSuppliersItems.length; i++){
      let itemId = dataSuppliersItems[i].Item.id
      let itemQty = dataSuppliersItems[i].Item.item_qty
      let itemName = dataSuppliersItems[i].Item.item_name
      let itemPrice = dataSuppliersItems[i].item_price
      if(dataSuppliersItems[i].ItemId === itemId){
        itemQty += dataSuppliersItems[i].qtySupply
        model.Item.update(
          {
            item_qty: itemQty
          },
          {
            where: {id: dataSuppliersItems[i].ItemId}
          }
        ).then(function(){
          model.Supplier_history.create(
            {
              item_name: itemName,
              item_qty_supplied: dataSuppliersItems[i].qtySupply,
              item_price: itemPrice,
              createdAt: new Date(),
              updatedAt: new Date(),
              SupplierId: req.params.idSuppliers,
              ItemId: itemId
            }
          ).then(function(){
            model.Supplier_item.destroy(
              {
                where: {SupplierId: req.params.idSuppliers}
              }
            ).then(function(){
              res.redirect(`/suppliersOrders/suppliers/${req.params.idSuppliers}/viewOrders`)
            })
          })
        })
      }
    }
  })
})

module.exports = router
