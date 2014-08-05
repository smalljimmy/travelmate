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
		
		var guest = new Guest(); 		// create a new instance of the Guest model
		guest.name = req.body.name;  // set the guest name (comes from the request)
		guest.latitude = req.body.latitude;
		guest.longitude = req.body.longitude
		guest.gender = req.body.gender
		
		// save the guest and check for errors
		guest.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'guest created!' });
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

			guest.name = req.body.name; 	// update the guests info
			guest.latitude = req.body.latitude;
			guest.longitude = req.body.longitude
			guest.gender = req.body.gender

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


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

var Guest     = require('./models/guest');


app.get('/guest/getAllGuests', function(req, res) {
	res.type('application/json');
	var guests = [];
	
	
	var guest = new Object ();
	guest.name = "Jimmy";
	guest.latitude = 100;
	guest.longitude = 100;
	guest.gender = 0;
	
	guests.push(guest);
	
	guest = new Object ();
	guest.name = "Jenny";
	guest.latitude = 101;
	guest.longitude = 110;
	guest.gender = 1;
	
	guests.push(guest);

	var json = JSON.stringify(guests);
	res.json(json);
});



app.listen(port);