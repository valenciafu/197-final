var mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
	answer: { type: String },
	qid: { type: String }
})

module.exports = mongoose.model('Answer', answerSchema);