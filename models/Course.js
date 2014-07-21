var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

var userSchema = new mongoose.Schema({
  id: String, 
  shortName: String,
  name: String, 

  smallIcon: String, 
  largeIcon: String, 
  photo: String, 
  universityLogo: String,

  video: String,

  shortDescription: String, 
  aboutTheCourse: String, 
  
  targetAudience: String, 
  courseSyllabus: String,
  suggestedReadings: String, 
  estimatedClassWorkload: String, 
  categories: String
});

module.exports = mongoose.model('Course', userSchema);
