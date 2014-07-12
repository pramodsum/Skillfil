var express = require('express');
var router = express.Router();
var coursera = require('../apis/coursera');
var suggestions = require('../apis/suggestions');

var skill = "data science"

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { 
  	title: 'Skillfil'
  });
});

// a button should have action="/log-in"
router.get('/google', function(req, res) {
    coursera.getCoursera(skill, function(course) {
        res.render('coursera', {
            course: course 
        });
    });
})

router.get('/suggestions', function(req, res) {
    suggestions.getCoursera(skill, function(results) {
        res.render('suggestions', {
            user: 'Heisenberg',
            results: results,
            result: '',
            course_url: 'https://www.coursera.org/course/'
        });
    });
})

module.exports = router;
