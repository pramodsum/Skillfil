var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

var courseSchema = new mongoose.Schema({
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

function Course(el) {
  this.id = el['id'];
  this.shortName = el['shortName'];
  this.name = el['name'];

  this.smallIcon = el['smallIcon'];
  this.largeIcon = el['largeIcon'];
  this.photo = el['photo'];
  this.universityLogo = el['universityLogo'];

  this.video = el['video'];

  this.shortDescription = el['shortDescription'];
  this.aboutTheCourse = el['aboutTheCourse'];

  this.targetAudience = el['targetAudience'];
  this.courseSyllabus = el['courseSyllabus'];
  this.suggestedReadings = el['suggestedReadings'];
  this.estimatedClassWorkload = el['estimatedClassWorkload'];
  this.categories = el['categories'];
}

module.exports = mongoose.model('Course', courseSchema);
