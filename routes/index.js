var express = require('express');
var router = express.Router();
var suggestions = require('../apis/suggestions');
var khan = require('../apis/khan');

var skill = "data science";
var BING_ENDPOINT = "http://10.16.20.34:8080/BingSearch.aspx?query=";
var DATA_ENDPOINT = "http://10.16.20.34:8080/LookupSkills.aspx?UserSkills="

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { 
  	title: 'Skillfil'
  });
});

// a button should have action="/log-in"
router.get('/khan', function(req, res) {
    khan.searchKhan(skill, function(results) {
        res.render('khan', {
            topicTree: results
        });
    });
});

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

router.get('/coursera', function(req, res) {
    suggestions.getApiJsonResults(BING_ENDPOINT, 'coursera', skill, function(results) {
        // console.log(results);
        console.log(results[0]);
        console.log(results[1]);
        res.render('coursera', {
            course: results[0]
        })
    });
}) 

router.get('/data', function(req, res) {
    var skills = ['machine learning', 'ruby'];
    suggestions.getAdvancedData(skills, function(results)
    {
        res.render('data', {
            results: results
        })
    })
})

module.exports = router;
