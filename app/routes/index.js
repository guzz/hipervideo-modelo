var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET vueapp index */
console.log('<<<<CHEOU AKI>>>>')
router.get('/', function(req, res) {
  var ua = req.headers['user-agent']
  if (/mobile/i.test(ua)) {
    res.redirect('https://hipervideo.jardimdigital.com.br');
  } else {
    res.render('index', {useragent: ua});
  }
});

module.exports = router;
