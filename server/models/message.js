var mongoose     = require('mongoose');
var Schema       = mongoose.Schema,
ObjectId = Schema.ObjectId;

var MessageSchema   = new Schema({
	from: ObjectId,
	to: ObjectId,
	content: String,
	time: { type: Date, default: Date.now },
	delivered: Boolean
});

module.exports = mongoose.model('Message', MessageSchema);