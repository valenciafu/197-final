var mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
	author: { type: String },
	questionText: { type: String },
	seen: { type: Boolean } //false by default, true if being seen by TA
})

module.exports = mongoose.model('Question', questionSchema);
