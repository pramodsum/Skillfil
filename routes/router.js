
var server = require("./server");
var request = require('request');
var cheerio = require('cheerio');
var http = require('http');

function hi( response ){
  //response.writeHead(200, {"Content-Type": "text/html"});  
  response.write( "hi called" ); 
  var url = 'http://localhost:8888/';
  request(url, function(err, resp, body) {
    if (err)
    throw err;
    $ = cheerio.load(body);
    console.log("here is the $:");
    //console.log($);
    //console.log(resp);
    $('#someId').each(function(){
      var data = $(this);
      console.log(data);
    })
 
  }); 
}

function bye( response ){
  var options = {
    host: 'localhost',
    port: 8888,
    path: '/'
  };
  str = ""
  console.log("bye called");

callback = function(response) {

  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(req.data);
    console.log(str);
    // your code here if you want to use the results !
  });
}

var req = http.request(options, callback).end();
}

function route(pathname, response) {
  console.log("About to route a request for " + pathname);
  if(pathname.substr(1) == "hi" ){
    hi(response)
  }
  else if(pathname.substr(1) == "bye" ){
    bye(response)
  }

}

exports.route = route;






