var express = require('express');
var router = express.Router();
var coursera = require('../apis/coursera');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { 
  	title: 'Skillfil'
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
