var express = require('express');
var router = express.Router();
var suggestions = require('../apis/suggestions');
var localStorage = require('localStorage');
var khan = require('../apis/khan');

var skill = "information retrieval";
var BING_ENDPOINT = "http://10.16.20.34:8080/BingSearch.aspx?query=";
var DATA_ENDPOINT = "http://10.16.20.34:8080/LookupSkills.aspx?UserSkills="


var skillSuggestions = new Array();
var results= new Array();

//  var io = require('socket.io-client');

//  io.on('connection', function (socket) {
//     console.log("connected!");
//     io.emit('news', { will: 'be received by everyone'});

//     socket.on('private message', function (from, msg) {
//         console.log('I received a private message by ', from, ' saying ', msg);
//     });

//     socket.on('skills', function(data){
//         profile = JSON.parse(data);
//         console.log(JSON.stringify(profile));
//         skills = grabSkills(profile);
//         console.log(skills);
//         localStorage.setItem('skills', JSON.stringify(skills));
//         console.log("Storing skills: " + localStorage.getItem('skills'));
//         // module.exports = { };
//     });

//     socket.on('disconnect', function () {
//         io.sockets.emit('user disconnected');
//     });
// });

var io = require('socket.io')(3001);


var profile;
var skills;

function grabSkills(profile){
	var skills = [];
	for(var j = 0; j < profile.skills.values.length; j++){
		skills.push(profile.skills.values[j].skill.name);
	}
	return skills;
}

  // var skillSocket = io.connect('http://localhost:3002');
  // skillSocket.on('news', function (data) {
  //     console.log(data);
  // });
  // skillSocket.emit('skills', skills);

 // io.on('connection', function (socket) {
 //    console.log("connected!");
 //    io.emit('news', { will: 'be received by everyone'});

 //    socket.on('private message', function (from, msg) {
 //        console.log('I received a private message by ', from, ' saying ', msg);
 //    });

 //    socket.on('profile', function(data){
 //        profile = JSON.parse(data);
 //        console.log(JSON.stringify(profile));
 //        skills = grabSkills(profile);
 //        console.log(skills);
 //        localStorage.setItem('skills', JSON.stringify(skills));
 //        console.log("Getting skills: " + localStorage.getItem('skills'));
 //        // module.exports = { };

 //        // var skillSocket = io.connect('http://localhost:3002');
 //        // skillSocket.on('news', function (data) {
 //        //     console.log(data);
 //        // });
 //        // skillSocket.emit('skills', skills);

 //    });

 //    socket.on('disconnect', function () {
 //        io.sockets.emit('user disconnected');
 //    });
// });
// >>>>>>> Stashed changes
io.on('connect', function (socket) {
		console.log("connected!");
		io.emit('news', { will: 'be received by everyone'});

		socket.on('private message', function (from, msg) {
			console.log('I received a private message by ', from, ' saying ', msg);
		});

		socket.on('profile', function(data){
			console.log("IT WORKED!!!!!!!!!!!!!!");  
			profile = JSON.parse(data);          	
			console.log(JSON.stringify(profile));
           //  	    var p = res.render('suggestions', {
			        //     user: profile.firstName,
			        //     results: no2,
			        //     skillSuggestions: skillSuggestions,
			        //     course_url: 'https://www.coursera.org/course/'
			        // });
			        // res.json({user: "Jordan"});
			        // console.log(p);
			        // console.log("ugh");

			    });

		socket.on('disconnect', function () {
			io.sockets.emit('user disconnected');
		});
	});


/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { 
		title: 'Skillfil'
	});
	

});

// a button should have action="/log-in"
router.get('/khan', function(req, res) {
	khan.searchKhan(skill, function(results) {
		res.render('khan', {
			topicTree: results
		});
	});
});

router.get('/suggestions', function(req, res) {
	// var skills = ['information retrieval', 'python', 'java', 'data mining', 'c++', 'perl', 'linux', 'statistical'];
	var skills = profile.skills.values;
	suggestions.getAdvancedData(skills, function(temp){
		console.log(temp);
        skillSuggestions = temp['L2RankedSkills'];
        console.log('suggestions: ' + skillSuggestions);
    });
	suggestions.getCoursera(skills.toString(), function(no2) {
		if(profile != undefined)
			console.log("profile: " + profile.firstName);
		// console.log(no2);

		res.render('suggestions', {
			user: profile.firstName,
			results: no2,
			skillSuggestions: skillSuggestions,
			course_url: 'https://www.coursera.org/course/'
		});



		// res.render('suggestions', {
		// 	user: 'Jordan',
		// 	results: no2,
		// 	skillSuggestions: skillSuggestions,
		// 	course_url: 'https://www.coursera.org/course/'
		// });
	});
});

router.get('/coursera', function(req, res) {
	suggestions.getApiJsonResults(BING_ENDPOINT, 'coursera', skill, function(results) {
        // console.log(results);
       // console.log(results[0]);
       // console.log(results[1]);
       res.render('coursera', {
       	course: results[0]
       })
   });
}) 

router.get('/data', function(req, res) {
	var skills = profile.skills.values;
	suggestions.getAdvancedData(skills, function(results)
	{
		res.render('data', {
			results: results
		})
	})
})

module.exports = router;
