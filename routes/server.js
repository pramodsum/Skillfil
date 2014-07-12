var http = require("http");
var url = require("url");
var fs = require('fs');

var html =  ['<div id="someId">',
            'some content<br />',
            '<a href="#someRef">someRefTxt</a>',
            '</div>'
            ].join('\n'); 

function exec( str ){
  
}

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    response.writeHead(200, {"Content-Type": "text/html"});
    route(pathname, response);

    response.write("Hello World");
    fs.readFile('./test.html',function (err, data){
        //res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        if (err) {throw err;}
        console.log(data);
        response.write(data);
        response.end();
    });
    response.write(html);
    //response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
exports.exec = exec;
