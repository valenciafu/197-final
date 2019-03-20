var mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
	author: { type: String },
	questionText: { type: String },
	answer: { type: String }
})

module.exports = mongoose.model('Question', questionSchema);
