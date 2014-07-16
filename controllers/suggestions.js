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

//     var skills = ['machine learning', 'ruby'];
//     suggestions.getAdvancedData(skills, function(results)
//     {
//         res.render('data', {
//             results: results
//         })
//     })


/**
 * GET /suggestions
 * Course/Skill Suggestions Page
 */

exports.getSuggestions = function(req, res) {
    suggestions.getAdvancedData(skills, function(temp) {
        if(temp.length == 0) {
            console.log('ERROR: Server returned 0 skills');
            return;
        }
        // var json = JSON.parse(results);
        skillSuggestions = temp['L2RankedSkills'];
        console.log(skillSuggestions);
        // searchResults = results;
    })

    suggestions.getCoursera(skill, function(no2) {
        if(no2.length == 0) {
            console.log('ERROR: Server returned 0 courses');
            return;
        }
        console.log(skillSuggestions.length);
        results = no2;
    });
    res.render('suggestions', {
        title: 'Suggestions',
        user: 'Sumedha',
        results: results,
        skillSuggestions: skillSuggestions,
        course_url: 'https://www.coursera.org/course/'
    });
};