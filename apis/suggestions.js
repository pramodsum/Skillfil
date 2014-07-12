/**
 * Actually grabs the coursera link through a Google custom search, but close enough
 */

var request = require("request");

var BING_ENDPOINT = "http://10.16.20.34:8080/BingSearch.aspx?query=";
var DATA_ENDPOINT = "http://10.16.20.34:8080/LookupSkills.aspx?UserSkills="

module.exports = {

    // var SEARCH = 'machine learning';

    getCoursera: function(SEARCH, callback) 
    {
        var url = "https://api.coursera.org/api/catalog.v1/courses?fields=shortDescription,smallIcon,video&q=search&query=";
        url = url.concat(SEARCH.split(' ').join('+'));
        var results = new Array();
        request({ uri: url }, function(error, response, body) {
            if(error) {
                console.log(error);
                return;
            }
            var json = JSON.parse(body);
            var elements = json.elements;
            // console.log(elements);
            elements.forEach(function(el, index) {
                results[results.length] = el;
                console.log(el['name']);
            });
            callback(results);
        });
    },

    getEducationSource : function(source, search, callback)
    {
        var endpoint = "http://10.16.20.34:8080/BingSearch.aspx?query=";
        endpoint = endpoint.concat(source.split(' ').join('+'));
        endpoint += "+";
        endpoint = endpoint.concat(search.split(' ').join('+'));
        
        var results = new Array();
        request({ uri: endpoint }, function(error, response, body) 
        {
            if(error) {
                console.log(error);
                return;
            }
            var json = JSON.parse(body);
            // console.log(json);
            callback(json);
        });
    },

    getAdvancedData : function(skills, callback)
    {
        var endpoint = "http://10.16.20.34:8080/LookupSkills.aspx?UserSkills="
        endpoint = endpoint.concat(skills.join());

        var results = new Array();
        request({ uri: endpoint }, function(error, response, body) 
        {
            if(error) {
                console.log(error);
                return;
            }
            var json = JSON.parse(body);
            // console.log(json);
            callback(json);
        });        
    }

};