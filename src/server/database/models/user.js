var mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: { type: String },
	password: { type: String },
	type: { type: String }, //'student' or 'ta'
})

module.exports = mongoose.model('User', userSchema);
