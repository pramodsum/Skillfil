var express = require('express');
var router = express.Router();
var coursera = require('../apis/coursera');

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
    req.query.skill = "data science";
    coursera.getCoursera(req.query.skill, function(course) {
        res.render('coursera', {
            course: course 
        });
    });
})

module.exports = router;
