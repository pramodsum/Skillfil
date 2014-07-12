/**
 * Actually grabs the coursera link through a Google custom search, but close enough
 */

var googleapis = require('googleapis');

var CX = '004993845370834102111:acnmbd-2uka';
var API_KEY = 'AIzaSyBgvXaTMvmBbYaTYXC_rqeK3aYZ4dAE75I';

module.exports = {

    // var SEARCH = 'machine learning';

    getCoursera : function(SEARCH) 
    {
        // Initializes API
        googleapis
            .discover('customsearch', 'v1')
            .execute(function(err, client) {
            if (err) {
                console.log('An error occured', err);
                return;
            }
            // Sends request
            launchSearch(client, SEARCH, function(err, response) {
                if (err) {
                    console.log('An error occure\d', err);
                    return;
                }
                // Got the response from custom search
                if (response.items.length > 0) {
                    console.log(response.items[0]);
                    return response.items[0];
                    res.render('coursera', {
                        course: response.items[0]
                    });
                }
            });
        });
    }

    // Sends the query to the API
    launchSearch : function(client, query, callback) {
        var req = client.customsearch.cse.list({cx: CX, q: query})
            .withApiKey(API_KEY);
        req.execute(function(err, response) {
            callback(err, response);
        });
    }

};
