const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	fullname: { type: String },
	email: { type: String },
	repo: { type: String },
	URL: { type: String },
	questions: { type: Array, default: undefined }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
