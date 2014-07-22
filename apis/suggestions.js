/**
 * Actually grabs the coursera link through a Google custom search, but close enough
 * http://10.16.20.34:8080/LookupSkills.aspx?UserSkills=data+science,machine+learning
 * http://10.16.20.34:8080/BingSearch.aspx?query=machine+learning
 */

 var request = require("request");
 var localStorage = require('localStorage');
 var Course = require('../models/Course');

 var BING_ENDPOINT = "http://10.16.20.34:8080/BingSearch.aspx?query=";
 var DATA_ENDPOINT = "http://10.16.20.34:8080/LookupSkills.aspx?UserSkills="
 // Object.defineProperty(module.exports, "skills", {
 //    get: function() {return "Java"; }
 // });

 module.exports = {

    // var SEARCH = 'machine learning';

    // skills: function(){
    //     return "Computer Science";
    // },
    // grabSkills: function(profile)
    // {
    //     var io = require('socket.io')(3001);
    //     var skills = [];
    //     for(var j = 0; j < profile.skills.values.length; j++){
    //         skills.push(profile.skills.values[j].skill.name);
    //     }

    //      io.on('connection', function (socket) {
    //         console.log("connected!");
    //         io.emit('news', { will: 'be received by everyone'});

    //         socket.on('private message', function (from, msg) {
    //             console.log('I received a private message by ', from, ' saying ', msg);
    //         });

    //         socket.on('profile', function(data){
    //             profile = JSON.parse(data);
    //             console.log(JSON.stringify(profile));
    //             skills = grabSkills(profile);
    //             console.log(skills);
    //             localStorage.setItem('skills', JSON.stringify(skills));
    //             console.log("Storing skills: " + localStorage.getItem('skills'));
    //             // module.exports = { };

    //             // var skillSocket = io.connect('http://localhost:3002');
    //             // skillSocket.on('news', function (data) {
    //             //     console.log(data);
    //             // });
    //             // skillSocket.emit('skills', skills);

    //         });

    //         socket.on('disconnect', function () {
    //             io.sockets.emit('user disconnected');
    //         });
    //     });

    //     return skills;
    // },

    getCoursera: function(SEARCH, callback) 
    {
        var url = "https://api.coursera.org/api/catalog.v1/courses?fields=shortDescription,smallIcon,video&q=search&query=";
        url = url.concat(SEARCH.split(' ').join('+'));
        var results = new Array();
        request({ uri: url }, function(error, response, body) {
            if(error) {
                //console.log(error);
                return;
            }
            // console.log("Skills: " + skills);
            // console.log(body);
            var json = JSON.parse(body);
            var elements = json.elements;
            // console.log(elements);
            elements.forEach(function(el, index) {
                results[results.length] = new Course(el);
                console.log(el);
            });
            callback(results, function(res, tempResults, io){
                 io.on('connection', function (socket) {
                     console.log("connected!");
                     io.emit('news', { will: 'be received by everyone'});

                     socket.on('private message', function (from, msg) {
                         console.log('I received a private message by ', from, ' saying ', msg);
                     });

                     socket.on('profile', function(data){
                         profile = JSON.parse(data);
                        // console.log(JSON.stringify(profile));
                         skills = grabSkills(profile);
                        // console.log(skills);
                         localStorage.setItem('skills', JSON.stringify(skills));
                         console.log("Getting skills: " + localStorage.getItem('skills'));

                         callback(tempResults)
                        // res.render('suggestions', {
                        //     user: 'Heisenberg',
                        //     results: tempResults,
                        //     result: '',
                        //     course_url: 'https://www.coursera.org/course/'
                        // });

        // module.exports = { };

        // var skillSocket = io.connect('http://localhost:3002');
        // skillSocket.on('news', function (data) {
        //     console.log(data);
        // });
        // skillSocket.emit('skills', skills);

                    });

                    socket.on('disconnect', function () {
                        io.sockets.emit('user disconnected');
                    });
                });

            });
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
                //console.log(error);
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
        endpoint = endpoint.concat(skills.join('+'));

        var results = new Array();
        request({ uri: endpoint }, function(error, response, body) 
        {
            if(error) {
                console.log(error);
                return;
            }
            var json = JSON.parse(body);
            console.log(json);
            callback(json);
        });        
    }

};


