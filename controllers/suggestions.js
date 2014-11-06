/**
 * GET /
 * Suggestions Page
 */
var express = require('express');
var router = express.Router();
var suggestions = require('../apis/suggestions');
var khan = require('../apis/khan');

var _ = require('underscore');

var skill = "information retrieval";
var BING_ENDPOINT = "http://10.16.20.34:8080/BingSearch.aspx?query=";
var DATA_ENDPOINT = "http://10.16.20.34:8080/LookupSkills.aspx?UserSkills="

var skillSuggestions = [];
var results= [];
var skills = ['information retrieval', 'python', 'data mining'];

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
        skillSuggestions = temp;
        // console.log(skillSuggestions);

        var skillList = [];
        for(var i = 0; i < skillSuggestions.length; i++) {
            skillList.push(skillSuggestions[i]['Skill']);
        }

        // console.log(skillList);
        skillList = _.uniq(skillList.slice(0,9));

        suggestions.getCoursera(skillList, function(no2) {
            if(no2.length == 0) {
                console.log('ERROR: Server returned 0 courses');
                return;
            }

            results = _.uniq(results.concat(no2));

            // console.log("I IS HERE");
            res.render('suggestions', {
                title: 'Suggestions',
                user: 'Sumedha',
                results: results,
                skillSuggestions: skillList,
                course_url: 'https://www.coursera.org/course/'
            });
        });
    });
};