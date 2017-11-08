let express = require('express')
let app = express()
let bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.use(express.static('public'));
let index = require('./routers/index.js')
let customers = require('./routers/customers.js')
let suppliers = require('./routers/suppliers.js')
let items = require('./routers/items.js')
let marketplace = require('./routers/marketplace.js')
let suppliersOrders = require('./routers/suppliersOrders.js')
let admins = require('./routers/admins.js')

// Router
app.use('/',index)
app.use('/customers',customers)
app.use('/suppliers',suppliers)
app.use('/items',items)
app.use('/marketplace',marketplace)
app.use('/suppliersOrders',suppliersOrders)
app.use('/admins',admins)

// Listening Server
app.listen(14045,function(){
  console.log(`Calling 14045 --> Dengan Hotline KFC, mau pesan paha apa dada?`);
})
