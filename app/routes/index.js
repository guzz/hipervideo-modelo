var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET vueapp index */
router.get('/', function(req, res) {
  var ua = req.headers['user-agent']
  res.render('index', {});
  // if (/mobile/i.test(ua)) {
  //   res.render('mobile', {});
  // } else {
    
  //   console.log('teste-index');
  // }
});

module.exports = router;
