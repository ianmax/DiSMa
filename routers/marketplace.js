let express = require('express')
let router = express.Router()
let model = require('../models')
let formatCurrency = require('format-currency')
let opts = { format: '%s%v', symbol: 'IDR ' }

// Get marketplace main page - customers
router.get('/customers/:id',function(req,res){
  model.Item.findAll().then(function(rowsItems){
    model.Customer.findAll(
      {
        where: {id: req.params.id}
      }
    ).then(function(rowsCustomers){
      res.render('marketplaceItems',
      {
        dataJsonItems: rowsItems,
        dataJsonCustomers: rowsCustomers,
        pageTitle: 'DiSMa: Purchase Order Page'
      })
    })
  })
})

// Post add to cart based on customers id - customers
router.post('/customers/:idCustomers/:idItems/addToCart',function(req,res){
  model.Customer_item.create(
    {
      CustomerId: req.params.idCustomers,
      ItemId: req.params.idItems,
      createdAt: new Date(),
      updatedAt: new Date(),
      qtyBuy: req.body.qtyBuy
    }
  ).then(function(){
    res.redirect(`/marketplace/customers/${req.params.idCustomers}`)
  })
})

// Get "view cart" page - customers
router.get('/customers/:idCustomers/viewCart',function(req,res){
  model.Customer_item.findAll(
    {
      attributes: [
        'id',
        'CustomerId',
        'ItemId',
        'createdAt',
        'updatedAt',
        'qtyBuy'
      ],
      where: {CustomerId: req.params.idCustomers}
    }
  ).then(function(rowsCustomersItems){
    model.Customer.findAll(
      {
        where: {id: req.params.idCustomers}
      }
    ).then(function(rowsCustomers){
      model.Item.findAll().then(function(rowsItems){
        for(let i = 0; i < rowsItems.length; i++){
          rowsItems[i].item_price = formatCurrency(rowsItems[i].item_price,opts)
        }
        res.render('viewCart',
        {
          dataJsonCustomersItems:rowsCustomersItems,
          dataJsonCustomers:rowsCustomers,
          dataJsonItems:rowsItems,
          pageTitle: 'DiSMa: viewCart Page'
        })
      })
    })
  })
})

// Remove item from cart - customers
router.get('/customers/:idCustomers/:idCustomersItems/delete',function(req,res){
  model.Customer_item.destroy(
    {
      where: {id: req.params.idCustomersItems}
    }
  ).then(function(){
    res.redirect(`/marketplace/customers/${req.params.idCustomers}/viewCart`)
  })
})

// Approve customers orders - customers
router.get('/customers/:idCustomers/approveOrders',function(req,res){
  model.Customer_item.findAll(
    {
      where: {CustomerId: req.params.idCustomers},
      include:[model.Item]
    }
  ).then(function(rowsCustomersItems){
    let dataCustomersItems = rowsCustomersItems
    for(let i = 0; i < dataCustomersItems.length; i++){
      let itemId = dataCustomersItems[i].Item.id
      let itemQty = dataCustomersItems[i].Item.item_qty
      let itemName = dataCustomersItems[i].Item.item_name
      let itemPrice = dataCustomersItems[i].Item.item_price
      let itemSellingPrice = dataCustomersItems[i].Item.item_selling_price
      if(dataCustomersItems[i].ItemId === itemId){
        itemQty -= dataCustomersItems[i].qtyBuy
        model.Item.update(
          {
            item_qty: itemQty
          },
          {
            where: {id: dataCustomersItems[i].ItemId}
          }
        ).then(function(){
          model.Customer_history.create(
            {
              item_name: itemName,
              item_qty_buyed: dataCustomersItems[i].qtyBuy,
              item_price: itemPrice,
              item_price_supplied: itemSellingPrice,
              CustomerId: req.params.idCustomers,
              ItemId: itemId,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ).then(function(){
            model.Customer_item.destroy(
              {
                where: {CustomerId: req.params.idCustomers}
              }
            ).then(function(){
              res.redirect(`/marketplace/customers/${req.params.idCustomers}/viewCart`)
            })
          })
        })
      }
    }
  })
})

module.exports = router
