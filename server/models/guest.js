var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GuestSchema   = new Schema({
	name: String,
	latitude: Number,
	longitude: Number,
	gender: Boolean
});

module.exports = mongoose.model('Guest', GuestSchema);