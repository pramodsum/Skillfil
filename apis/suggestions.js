/**
 * Actually grabs the coursera link through a Google custom search, but close enough
 */

var request = require("request");

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
    }
};