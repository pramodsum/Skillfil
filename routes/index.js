var express = require('express');
var router = express.Router();

var hi = 'hello world'
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { 
  	title: 'Skillfil',
  	text: hi
  });
});

module.exports = router;
