let express = require('express');
let app = express();
let bodyParser = require('body-parser');

// Express session
let session = require('express-session')
app.use(session({
    secret: 'test',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')

let index = require('./routers/index.js')
let customers = require('./routers/customers.js')
let suppliers = require('./routers/suppliers.js')
let items = require('./routers/items.js')
let marketplace = require('./routers/marketplace.js')
let suppliersOrders = require('./routers/suppliersOrders.js')
let admins = require('./routers/admins.js')
let login = require('./routers/login.js')
let logout = require('./routers/logout.js')

// Router
app.use('/',index)
app.use('/customers',customers)
app.use('/suppliers',suppliers)
app.use('/items',items)
app.use('/marketplace',marketplace)
app.use('/suppliersOrders',suppliersOrders)
app.use('/admins',admins)
app.use('/login',login)
app.use('/logout',logout)


// Listening Server

app.listen(14045,function(){
  console.log(`Calling 14045 --> Dengan Hotline KFC, mau pesan paha apa dada?`);
})

