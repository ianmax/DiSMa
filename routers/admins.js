let express = require('express')
let router = express.Router()
let model = require('../models')

let formatCurrency = require('format-currency')
let opts = { format: '%s%v', symbol: 'IDR ' }

// Get "admin dashboard" page
router.get('/',function(req,res){

  model.Customer_history.findAll(
    {
      include: [model.Supplier,model.Customer]
    }
  ).then(function(rowsCustomersHistories){
    let arrSumSuppliersPrice = []
    let arrSumCustomersPrice = []
    let countRevenue = 0
    let countProfit = 0
    let countQty = 0
    let dateCheck = new Date(`${req.query.month} ${req.query.day}, ${req.query.year}`)
    let dateCheckEnd = new Date(`${req.query.monthEnd} ${req.query.dayEnd}, ${req.query.yearEnd}`)
    for(let i = 0; i < rowsCustomersHistories.length; i++){
      let dataDate = rowsCustomersHistories[i].createdAt
      if(dataDate > dateCheck && dataDate < dateCheckEnd){
        rowsCustomersHistories[i].item_price *= rowsCustomersHistories[i].item_qty_buyed
        countRevenue += rowsCustomersHistories[i].item_price
        countQty += rowsCustomersHistories[i].item_qty_buyed
        arrSumCustomersPrice.push(rowsCustomersHistories[i])
      }
    }
    for(let y = 0; y < rowsCustomersHistories.length; y++){
      let dataDate = rowsCustomersHistories[y].createdAt
      if(dataDate > dateCheck && dataDate < dateCheckEnd){
        rowsCustomersHistories[y].item_price_supplied *= rowsCustomersHistories[y].item_qty_buyed
        countProfit += (rowsCustomersHistories[y].item_price - rowsCustomersHistories[y].item_price_supplied)
        arrSumSuppliersPrice.push(rowsCustomersHistories[y])
      }
    }
    for(let a = 0; a < arrSumCustomersPrice.length; a++){
      for(let b = 0; b < arrSumSuppliersPrice.length; b++){
        arrSumSuppliersPrice[b].item_price_supplied = formatCurrency(arrSumSuppliersPrice[b].item_price_supplied,opts)
        arrSumCustomersPrice[a].item_price = formatCurrency(arrSumCustomersPrice[a].item_price,opts)
      }
    }
    countRevenue = formatCurrency(countRevenue,opts)
    countProfit = formatCurrency(countProfit,opts)
    res.render('adminPanel',
    {
      dataJsonCustomersHistories: arrSumCustomersPrice,
      dataJsonSuppliersHistories: arrSumSuppliersPrice,
      dataJsonSumRevenue: countRevenue,
      dataJsonSumProfit: countProfit,
      dataJsonSumQty: countQty,
      dataJsonQuerry: req.query
    })
  })
})

module.exports = router
