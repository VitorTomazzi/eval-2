const express = require('express');
const router = express.Router();
let User = require('../models/user.model');

router.get('/', (req, res, next) => {
	User.find().then((users) => res.json(users)).catch((err) => res.status(400).json('Error:' + err));
});

router.route('/submit').post((req, res, next) => {
	const fullname = req.body.fullname;
	const email = req.body.email;
	const repo = req.body.repo;
	const URL = req.body.URL;
	const questions = req.body.questions;

	const newUser = new User({
		fullname,
		email,
		repo,
		URL,
		questions
	});
	newUser.save().then(() => res.json('User submission added!')).catch((err) => res.status(400).json('Error' + err));
});

module.exports = router;
