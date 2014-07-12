var express = require('express');
var router = express.Router();
var coursera = require('./apis/coursera');

var hi = 'hello world'
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { 
  	title: 'Skillfil',
  	text: hi
  });
});

// a button should have action="/log-in"
router.get('/google', function(req, res) {
    var course = coursera.getCoursera(req.query.skill);
    res.render('coursera', course);
})

module.exports = router;
