var mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: { type: String },
	password: { type: String },
	ta: { type: Boolean }, // true if user is TA, false if student
})

module.exports = mongoose.model('User', userSchema);
