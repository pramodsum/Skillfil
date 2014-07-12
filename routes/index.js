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

// a button should have action="/log-in"
router.get('/profile', function(req, res) {
    suggestions.getSuggestions(skill, function(results, err) {
        if(err) {
            res.render('suggestions', {
                error: err
            });
        } else {
            res.render('suggestions', {
                user: 'Heisenberg',
                results: results
            });
        }
    });
})

module.exports = router;
