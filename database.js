// database.js

var mongoose  =   require('mongoose');

var todoSchema  = mongoose.Schema({
  name  :   { type: String, required: true},
  status  :   Boolean
});

// CREATING AND EXPOSING OUR MODEL TO THE APP
module.exports = mongoose.model('Todo', todoSchema);