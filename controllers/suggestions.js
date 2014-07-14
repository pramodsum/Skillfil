/**
 * GET /
 * Suggestions Page
 */
 var express = require('express');
var router = express.Router();
var suggestions = require('../apis/suggestions');
var khan = require('../apis/khan');

var skill = "information retrieval";
var BING_ENDPOINT = "http://10.16.20.34:8080/BingSearch.aspx?query=";
var DATA_ENDPOINT = "http://10.16.20.34:8080/LookupSkills.aspx?UserSkills="

var skillSuggestions = new Array();
var results= new Array();
var skills = ['information retrieval', 'python', 'java', 'data mining', 'c++', 'perl', 'linux', 'statistical'];

suggestions.getAdvancedData(skills, function(temp)
{
    // var json = JSON.parse(results);
    skillSuggestions = temp['L2RankedSkills'];
    console.log(skillSuggestions);
    // searchResults = results;
})

suggestions.getCoursera(skill, function(no2) {
    console.log(skillSuggestions.length);
    results = no2;
});

//     var skills = ['machine learning', 'ruby'];
//     suggestions.getAdvancedData(skills, function(results)
//     {
//         res.render('data', {
//             results: results
//         })
//     })

exports.index = function(req, res) {
  res.render('home', {
    title: 'Home',
    user: 'Sumedha',
    results: results,
    skillSuggestions: skillSuggestions,
    course_url: 'https://www.coursera.org/course/'
  });
};
