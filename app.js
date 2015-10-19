// call the packages we need
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');

// set port
var port = process.env.PORT || 8080; 

var router = express.Router();

router.use(function(req, res, next) {
	console.log("Some request is happening!");
	next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route("/comments").post(function(req, res) {
	var comment = new Comment();
	comment.name = req.body.name;

	comment.save(function(err) {
		if(err)
			res.send(err);

		res.json({ message: "Comment created!" });
	})
}).get(function(req, res) {
	Comment.find(function(err, comments) {
		if(err)
			res.send(err);

		res.json(comments);
	})
});

app.use('/api', router);
app.listen(port, function() {
	console.log('Server started ' + port);
});