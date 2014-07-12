var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('apiTest', { title: 'Api Testing' });

});

var http = require('http');

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: 'www.khanacademy.org',
  path: '/api/v1/topictree'
};
var str = "I got it!";
callback = function(response) {
  str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(JSON.parse(str));
    req.write(str);
  });
}

var req = http.request(options, callback);
req.write(str);
req.end();


module.exports = router;
