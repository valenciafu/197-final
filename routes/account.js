var express = require('express')
var router = express.Router();

var User = require('../models/user');

var isAuthenticated = require('../middlewares/isAuthenticated');

//Signup routes
router.get('/signup', function (req, res, next) {
	User.find({}, function (err, results) {
		console.log(results)
	})
	res.render('signup');
})

router.post('/signup', function (req, res, next) {
	var { username, password } = req.body;
	var u = new User({ username, password });
	u.save(function (err, result) {
		if (!err) {
			res.redirect('/')
		} else {
			next(err);
		}
	})
})

//Login routes
router.get('/login', function (req, res, next) {
	res.render('login')
})

router.post('/login', function (req, res, next) {
	var { username, password } = req.body;
	User.findOne({ username, password }, function (err, result) {
		if (result) {
			req.session.user = result.username;
			res.send("hi you're logged in");
		} else {
			next(new Error("incorrect credentials"));
		}
	})
})

//Logout route
router.get('/logout', isAuthenticated, function(req, res, next) {
	req.session.user = '';
	res.redirect('/');
})

module.exports = router;
