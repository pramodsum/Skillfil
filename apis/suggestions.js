/**
 * Actually grabs the coursera link through a Google custom search, but close enough
 */
 
var coursera = require('../apis/coursera');

var skill = "data science";
var coursera_course;
var results = [];

coursera.getCoursera(skill, function(course) {
    results[results.length] = course;
});

console.log(coursera_course);


module.exports = {

    // var SEARCH = 'machine learning';

    getSuggestions: function(SEARCH, callback) 
    {
        // Initializes API
        callback(results);
    }

};
