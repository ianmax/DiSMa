let express = require('express')
let router = express.Router()

router.get('/', function (req, res) {
  res.render('index', { pageTitle: 'DiSMa: HOME' });
});

module.exports = router;
