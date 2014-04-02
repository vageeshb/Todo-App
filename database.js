// database.js

var mongoose 	= 	require('mongoose');

var todoSchema 	= mongoose.Schema({
	name 	: 	{ type: String, required: true},
	status 	: 	Boolean
});

module.exports = mongoose.model('Todo', todoSchema);