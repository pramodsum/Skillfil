var http = require('http');
var request = require("request");
var fs = require("fs");
var googleapis = require('googleapis');

var CX = '004993845370834102111:acnmbd-2uka';
var API_KEY = 'AIzaSyBgvXaTMvmBbYaTYXC_rqeK3aYZ4dAE75I';

module.exports = {

    // var SEARCH = 'machine learning';

    

    getTopicTree: function(callback) 
    {

        //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
        var options = {
          host: 'www.khanacademy.org',
          path: '/api/v1/topictree'
        };
        // var url = "http://www.khanacademy.org/api/v1/topictree?kind=Topic";
        var url = "//public/khanTree.json";
        fs.readFile('/public/khanTree.json', function (err, data) {
            if (err) throw err;
                console.log(data);
        });
        request({uri: url}, function(error, response, body){
            if(error) {
                console.log(error);
                return;
            }
            var json = JSON.parse(body);
            console.log(JSON.stringify(json));
            // console.log(elements);
            callback(JSON.stringify(json));
        });
        // var json = {"test" : true};
        // callback(JSON.stringify(json));
        // var str = "";
        // callback2 = function(response) {
        //   //another chunk of data has been recieved, so append it to `str`
        //   response.on('data', function (chunk) {
        //     str += chunk;
        //   });

        //   //the whole response has been recieved, so we just print it out here
        //   response.on('end', function () {
        //     //console.log(JSON.parse(str));
        //     callback(str);
        //   });
        // };

        // var req = http.request(options, callback2);
        // req.end();
    },

    searchKhan: function(SEARCH, callback) 
    {
        // Initializes API
        googleapis
            .discover('customsearch', 'v1')
            .execute(function(err, client) {
            if (err) {
                console.log('An error occured', err);
                return;
            }
            console.log(callback);

            // Sends request
            module.exports.launchSearch(client, SEARCH, function(err, response) {
                if (err) {
                    console.log('An error occure\d', err);
                    return;
                }
                // Got the response from custom search
                if (response.items.length > 0) {
                    console.log("asdfasdfasdf");
                    callback(JSON.stringify(response.items[0]));
                }
            });
        });
    },


    // Sends the query to the API
    launchSearch : function(client, query, callback) 
    {
        var req = client.customsearch.cse.list({cx: CX, q: "khan academy " + query})
            .withApiKey(API_KEY);
        req.execute(function(err, response) {
            callback(err, response);
        });
    }
};
