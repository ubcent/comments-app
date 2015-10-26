// call the packages we need
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var config = require("./config");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose   = require('mongoose');
mongoose.connect(config.connection_string);

var Comment = require("./models/comment");

// set port
var port = process.env.PORT || 8080; 

var router = express.Router();

router.use(function(req, res, next) {
	console.log("Some request is happening!");
	next();
});


// Static path
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

router.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/comments.html');
});

router.get('/api', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route("/api/comments").post(function(req, res) {
	var comment = new Comment();
	comment.name = req.body.name;
	comment.text = req.body.text;

	comment.save(function(err) {
		if(err)
			res.send(err);

		res.json({ message: "Comment created!", comment: comment });
	})
}).get(function(req, res) {
	Comment.find(function(err, comments) {
		if(err)
			res.send(err);

		res.json(comments);
	}).skip(req.query.skip).limit(10);
});

router.route("/api/comments/:comment_id").get(function(req, res) {
	Comment.findById(req.params.comment_id, function(err, comment) {
		if(err)
			res.send(err);

		res.json(comment);
	});
}).put(function(req, res) {
	Comment.findById(req.params.comment_id, function(err, comment) {
		if(err)
			res.send(err);

		comment.name = req.body.name;
		comment.text = req.body.text;
		comment.likes = req.body.likes;

		comment.save(function(err) {
			if(err) 
				res.send(err);

			res.json({ message: "Comment updated!" });
		});
	});
}).delete(function(req, res){
	Comment.remove({
		_id: req.params.comment_id
	}, function(err, bear) {
		if(err)
			res.send(err);

		res.json({ message: "Comment deleted!" });
	});
});

app.use('/', router);
app.listen(port, function() {
	console.log('Server started ' + port);
});