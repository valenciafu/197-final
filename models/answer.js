var mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
	seen: { type: Boolean },
	qid: { type: String }
})

module.exports = mongoose.model('Answer', answerSchema);