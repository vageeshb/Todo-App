// server.js

// LOADING REQ MODULES
var express 	= 	require('express')
	, path 			= 	require('path')
	, app 			= 	express()
	, mongoose 	= 	require('mongoose')
	, Todo 			= 	require('./database.js')
	;


// DATABASE CONNECTION
mongoose.connect('mongodb://localhost:27017');

// CONFIG

var port 			= 	process.env.PORT || 8080;

app.configure( function() {

	// VIEWS FOLDER and TEMPLATING ENGINE
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	// MIDDLEWARE
	app.use(express.logger()); // Logging server requests
	app.use(express.urlencoded());
	app.use(express.json());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public/stylesheets')); // Server stylesheets
	app.use(app.router);			// Router to handle routes
	
});

// ROUTES
// TODO ROUTES ==================================
// READ TODOS
app.get('/', function(req, res) {
	Todo.find({}, function(err, data) {
		if(err) throw err;
		res.render('index.jade', {
			todos 	: 	data 
		});	
	});
});

// CREATE TODO
app.post('/', function(req, res) {
	var newTodo 		= 	new Todo();
	newTodo.name 		= 	req.body.task;
	newTodo.status 	= 	false;
	newTodo.save(function(err, task) {
		if(err) {
			throw err;
		} else {
			res.redirect('/');
		}
	});
});

// DELETE TODO
app.get('/:id/delete', function(req, res) {
	Todo.findByIdAndRemove(req.params.id, function(err) {
		if(err) throw err;
		res.redirect('/');
	});
});

// UPDATE TODO
app.get('/:id/do', function(req, res) {
	Todo.findByIdAndUpdate(req.params.id, { status: true } , function(err) {
		if(err) throw err;
		res.redirect('/');
	});
});

app.get('/:id/undo', function(req, res) {
	Todo.findByIdAndUpdate(req.params.id, { status: false } , function(err) {
		if(err) throw err;
		res.redirect('/');
	});
});
// ==============================================

app.get('*', function(req, res) {
	res.redirect('/');
});

// SERVER LAUNCH
app.listen( port, function() {
	console.log('Server is running and listening to: ' + port);
});