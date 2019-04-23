var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var frontendRoutes = require('./routes/frontend.js');
var accountRoutes = require('./routes/account.js');
var apiRoutes = require('./routes/api.js');

var User = require('./database/models/user');
var Question = require('./database/models/question');

var isAuthenticated = require('../../middlewares/isAuthenticated');

var app = express();

// instantiate a mongoose connect call
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ohq_db', {useNewUrlParser: true})

// set the express view engine to take care of ejs within html files
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

// TODO: set up body parser...hint hint: https://github.com/cis197/lecture-examples/blob/master/server-example/server.js#L27
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO: set up cookie session ... hint hint: https://github.com/cis197/lecture-examples/blob/master/server-example/server.js#L21
var cookieSession = require('cookie-session');
app.use(cookieSession({
	name: 'local-session',
	keys: ['spooky'],
	maxAge: 24 * 60 * 60 * 1000,
}))


// app.use('/static', express.static(path.join(__dirname, 'static')));
global.basedir = path.join(__dirname, '..', '..');
app.use(express.static(path.join(__dirname, '..', '..', 'public')));


// TODO: render out an index.html page with questions (queried from db)
//       also pass to ejs template a user object so we can conditionally
//       render the submit box

app.get('/', function (req, res, next) {
  var questionDb = Question.find({}, function(err, results) {
  	if (!err) {
  		res.render('index', { questions: results, user: req.session.user, userType: req.session.usertype });
  	} else {
  		res.send(err.message);
  	}
  })
});

// TODO: set up post route that will 
//       a) check to see if a user is authenticated
//       b) add a new question to the db
//       c) redirect the user back to the home page when done

app.post('/', isAuthenticated, function (req, res, next) {
	var q = req.body.question;
  	var a = req.session.user
	var dbQ = new Question({ author: a, questionText: q });
	dbQ.save(function (err, result, next) {
		if (!err) {
			res.redirect('/');
		} else {
			next(err);
		}
	})
})

app.use('/api', apiRoutes);
app.use('/account', accountRoutes);
app.use('/', frontendRoutes);

// don't put any routes below here!
app.use(function (err, req, res, next) {
  return res.send('ERROR :  ' + err.message)
})

app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port ' + (process.env.PORT || 3000))
})
