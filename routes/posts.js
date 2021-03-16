const express = require('express');
const router = express.Router();

const Post = require('../mongoModels/Post');
// if cant find record res.status(404)
// get all docs
// get by id
router.get('/id/:id', async (req, res) => {
	try {
		// get the data about  the queried user
		const posts = await Post.find({ _id: req.params.id });
		console.log(posts);
		// if cant find
		if (posts.length !== 0) res.json(posts);
		else res.status(404).send('Not Found');
	}
	catch (err) {
		res.status(400).json({ message: err });
	}
});
router.get('/', async (req, res) => {
	try {
		// get the data about  the queried user
		
		const posts = await Post.find();
		res.json(posts);
	}
	catch (err) {
		res.status(400).json({ message: err });
	}
});

//  get with the usrname
router.get('/:usrname', async (req, res) => {
	try {
		// get the data about  the queried user
		const posts = await Post.find({ username: req.params.usrname });
		console.log(typeof posts);
		// if cant find
		if (posts.length !== 0) res.json(posts); 
		else res.status(404).send('Not Found');
	}
	catch (err) {
		res.status(400).json({ message: err });
	}
});
// delete spesific post with the id
router.delete('/:id', async (req, res) => {
	try {
		const removedPost = await Post.remove({ _id: req.params.id });
		if (removedPost.lenght !==0) res.json(removedPost);
		else res.status(404).send('Not Found');
	}
	catch {
		res.status(400).json({ message: err });
	}


});
router.put('/:id', async (req, res) => {
	try {
		// call mongoose update with Post.updateOne
		const upadtedPost = await Post.findByIdAndUpdate({ _id: req.params.id },
			{
				username: req.body.username,
				password: req.body.password,
				date: req.body.date,
				email: req.body.email,
				name: req.body.name,
				surname: req.body.surname
			});
		if (upadtedPost.lenght !== 0) {
			const lastupdated = await Post.find({ _id: req.params.id });
			res.json(lastupdated);
		}
		else res.status(404).send('Not Found');
	}
	catch (err) {
		res.status(400).json({ message: err });
	}
});

// update variable count fields of mongo doc
router.patch('/:id', async (req, res) => {
	try
	{

		// 
		updtjson = {};
		// for every request body varialbe make a json field
		Object.keys(req.body).forEach((i, index) => { updtjson[i] = req.body[i]; });
		// call mongoose update with Post.updateOne
		const upadtedPost = await Post.updateOne({ _id: req.params.id },
			{
				// $set s value is updtjson which is json variable we created at the beginning of this function
				// to update dynamic number of field of one doc,eg  variable count properties of a user
				$set: updtjson
			});
		if (upadtedPost.lenght !== 0) res.json(upadtedPost);
		else res.status(404).send('Not Found');	}
	catch (err) {
		res.status(404).json({ message: err });
	}
});

router.post('/', async (req, res) => {
	console.log(req.body);
	const post = new Post({
		username: req.body.username,
		password: req.body.password,
		date: req.body.date,
		email: req.body.email,
		name: req.body.name,
		surname: req.body.surname
	});
	try {
		//sync await to make sure it waits till data comes from database
		const savedPost = await post.save();
		res.json(savedPost);
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

module.exports = router;