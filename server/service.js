var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//base setup
var mongoose   = require('mongoose');
mongoose.connect('mongodb://root:toor@proximus.modulusmongo.net:27017/ryva4ruZ');


app.use(bodyParser());


var port = process.env.PORT || 9999; 

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:9999/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// more routes for our API will happen here

// on routes that end in /guests
// ----------------------------------------------------
router.route('/guests')

	// create a guest (accessed at POST http://localhost:9999/api/guests)
	.post(function(req, res) {
		
		Guest.findOne({ name: req.body.name}, function (err, guest){
			if(err)
				res.send(err);
				
			if(guest) {
				res.json({ id: guest.id, message: 'guest exists.'});
				return;
			}
		});
		
		
		var guest = new Guest(); 		// create a new instance of the Guest model
		guest.name = req.body.name;  // set the guest name (comes from the request)
		if(req.body.latitude){
			guest.latitude = req.body.latitude;
		}
		if(req.body.longitude){
			guest.longitude = req.body.longitude;
		}
		guest.gender = req.body.gender;
		
		// save the guest and check for errors
		guest.save(function(err) {
			if (err)
				res.send(err);

			res.json({ id: guest.id, message: 'guest created!' });
		});
		
	})
	
	
	// get all the guests (accessed at GET http://localhost:9999/api/guests)
	.get(function(req, res) {
		Guest.find(function(err, guests) {
			if (err)
				res.send(err);

			res.json(guests);
		});
	});
	
// on routes that end in /guests/:guest_id
// ----------------------------------------------------
router.route('/guests/:guest_id')

	// get the guest with that id (accessed at GET http://localhost:9999/api/guests/:guest_id)
	.get(function(req, res) {
		Guest.findById(req.params.guest_id, function(err, guest) {
			if (err)
				res.send(err);
			res.json(guest);
		});
	})
	
		// update the guest with this id (accessed at PUT http://localhost:8080/api/guest/:guest_id)
	.put(function(req, res) {

		// use our guest model to find the guest we want
		Guest.findById(req.params.guest_id, function(err, guest) {

			if (err)
				res.send(err);

			if (req.body.name){
				guest.name = req.body.name; 	// update the guests info
			}
			
			if (req.body.latitude){
				guest.latitude = req.body.latitude;
			}
			
			if (req.body.longitude){
				guest.longitude = req.body.longitude;
			}
			
			if (req.body.gender){
				guest.gender = req.body.gender;
			}
			// save the guest
			guest.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Guest updated!' });
			});

		});
	})
	
	
	// delete the guest with this id (accessed at DELETE http://localhost:8080/api/guests/:guest_id)
	.delete(function(req, res) {
		Guest.remove({
			_id: req.params.guest_id
		}, function(err,guest) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// on routes that end in /messages
// ----------------------------------------------------
router.route('/messages')

	// create a message
	.post(function(req, res) {
			
		var message = new Message(); 		// create a new instance of the Message model
		message.from = req.body.from;
		message.to = req.body.to;
		message.content = req.body.content;
		
		// save the message and check for errors
		message.save(function(err) {
			if (err)
				res.send(err);

			res.json({ id: message.id, message: 'message created!' });
		});
		
	})
	
	
	// get all the messages 
	.get(function(req, res) {
		Message.find(function(err, messages) {
			if (err)
				res.send(err);

			res.json(messages);
		});
	});	
	
	
// on routes that end in /messages/:from/:to
// ----------------------------------------------------	
router.route('/messages/:from')

	// get the messages from/to the guest id 
	.get(function(req, res) {
		
		/**
		var filteredQuery = {},
		  acceptableFields = ['from', 'to'];

		acceptableFields.forEach(function(field) {
		  req.query[field] && filteredQuery[field] = req.query[field];
		});
		**/
		
		Message.find({from:req.query.from}, function (err, messages){
			if(err)
				res.send(err);
				
			res.json(messages);

		});	
		
		/**
		Message.update({from:req.query.from}, { time: Date.now() }, function(err, numberAffected, rawResponse) {
			//handle it
			if(err)
					res.send(err);
			
			Message.find({from:req.query.from}, function (err, messages){
				if(err)
					res.send(err);
					
				res.json(messages);

			})				
		});		
		**/
	});	
	

	

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

var Guest     = require('./models/guest');
var Message   = require('./models/message');

app.listen(port);