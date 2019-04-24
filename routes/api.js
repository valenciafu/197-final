var express = require('express')
var router = express.Router()

var Question = require('../models/question.js')

router.get('/getQuestions', function (req, res, next) {
	var user = req.session.user;
	var questionDb = Question.find({}, function(err, results) {
  	if (!err) {
  		res.json({ questions: results, currentUser: user});
  	} else {
  		res.send(err.message);
  	}
  })
})

router.post('/joinQueue', function (req, res, next) {
	var { questionText } = req.body;
  	var author = req.session.user;
	var q = new Question({ questionText, author });
	q.save(function (err, result) {
		if (err) next(err);
		res.json({ status: "OK, joined queue" });
	});
})

router.post('/seeStudent', function (req, res, next) {
	var qid = req.body.qid;

	Question.findById(qid, function (err, question) {
		question.seen = true;
		question.save(function (saveErr, result) {
			if (saveErr) next(saveErr);
			res.json({ status: "OK"});
		});
	}); 
})

router.delete('/removeQueueItem', function (req, res, next) {
	var user = req.session.user;
	var userType = req.session.usertype;
	var qAuthor = req.body.qAuthor;

	if (userType === 'ta' || user === qAuthor) {
		var qid = req.body.qid;
		Question.findByIdAndRemove(qid, function (err, question) {
			question.save(function (saveErr, result) {
				if (saveErr) next(saveErr);
				res.json({ status: "OK"});
			});
		}); 
	} else {
		res.send
		res.json({ status: "Error"});
	}
})

module.exports = router;