let express = require('express')
let router = express.Router()
let model = require('../models')

// Get "admin dashboard" page
router.get('/',function(req,res){
  model.Customer_history.findAll().then(function(rowsCustomersHistories){
    model.Customer.findAll().then(function(rowsCustomers){
      model.Supplier_history.findAll(
        {
          attributes: ['item_name','item_price','ItemId']
        }
      ).then(function(rowsSuppliersHistories){
        let arrSumCustomersPrice = []
        let arrSumSuppliersPrice = []
        let countRevenue = 0
        let countQty = 0
        let countProfit = 0
        for(let i = 0; i < rowsCustomersHistories.length; i++){
          rowsCustomersHistories[i].item_price *= rowsCustomersHistories[i].item_qty_buyed
          countRevenue += rowsCustomersHistories[i].item_price
          countQty += rowsCustomersHistories[i].item_qty_buyed
          arrSumCustomersPrice.push(rowsCustomersHistories[i])
        }
        for(let y = 0; y < rowsSuppliersHistories.length; y++){
          for(let k = 0; k < rowsCustomersHistories.length; k++){
            if(rowsSuppliersHistories[y].item_name === rowsCustomersHistories[k].item_name){
              rowsSuppliersHistories[y].item_price *= rowsCustomersHistories[k].item_qty_buyed
              countProfit += (rowsCustomersHistories[k].item_price - rowsSuppliersHistories[y].item_price)
              arrSumSuppliersPrice.push(rowsSuppliersHistories[y])
            }
          }
        }
        res.render('adminPanel',
        {
          dataJsonCustomersHistories: arrSumCustomersPrice,
          dataJsonCustomers: rowsCustomers,
          dataJsonSuppliersHistories: arrSumSuppliersPrice,
          dataJsonSumRevenue: countRevenue,
          dataJsonSumQty: countQty,
          dataJsonSumProfit: countProfit
        })
      })
    })
  })
})

module.exports = router
