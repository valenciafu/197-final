// TODO: Import various things...
// - express
// - path
// - body-parser
// - cookie-session
// - mongoose
// - various other file imports
var accountRoutes = require('./routes/account.js');
var apiRoutes = require('./routes/api.js');

var Question = require('./models/question');
var isAuthenticated = require('./middlewares/isAuthenticated');

// instantiate express app...TODO: make sure that you have required express
var express = require('express');
var app = express();
// instantiate a mongoose connect call
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ohq_db', {useNewUrlParser: true})

// set the express view engine to take care of ejs within html files
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

// TODO: set up body parser...hint hint: https://github.com/cis197/lecture-examples/blob/master/server-example/server.js#L27
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO: set up cookie session ... hint hint: https://github.com/cis197/lecture-examples/blob/master/server-example/server.js#L21
var cookieSession = require('cookie-session');
app.use(cookieSession({
	name: 'local-session',
	keys: ['spooky'],
	maxAge: 24 * 60 * 60 * 1000,
}))

var path = require('path');
app.use('/static', express.static(path.join(__dirname, 'static')));

//var questionsArr = [];
var User = require('./models/user');


const mainjsPath = path.join(__dirname,'public','build','main.js')
if (!fs.existsSync(mainjsPath)) {
  fs.writeFileSync(mainjsPath, '')
}


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

// TODO: Set up account routes under the '/account' route prefix. 
// (i.e. login should be /account/login, signup = /account/signup, 
//       logout = /account/logout)
app.use('/account', accountRoutes);


// don't put any routes below here!
app.use(function (err, req, res, next) {
  return res.send('ERROR :  ' + err.message)
})

app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port ' + (process.env.PORT || 3000))
})
