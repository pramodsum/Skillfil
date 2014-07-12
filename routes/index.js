var express = require('express');
var router = express.Router();
var googleapis = require('googleapis');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/google', function(req, res) {
    var CX = '004993845370834102111:acnmbd-2uka';
    var API_KEY = 'AIzaSyBgvXaTMvmBbYaTYXC_rqeK3aYZ4dAE75I';
    var SEARCH = 'machine learning';

    // Sends the query to the API
    function launchSearch(client, query, callback) {
      var req = client.customsearch.cse.list({cx: CX, q: query})
        .withApiKey(API_KEY);
      req.execute(function(err, response) {
        callback(err, response);
      });
    }

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
                    console.log('An error occured', err);
                    return;
                }
                // Got the response from custom search
                console.log('Result: ' + response.searchInformation.formattedTotalResults);
                if (response.items.length > 0) {
                    console.log(response);
                    console.log('First result name is ' + response.items[0].title);
                }
          });
    });
})

module.exports = router;
