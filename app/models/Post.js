
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');
var postSchema = new Schema({

	userName 			: {type:String,required:true},
	fullName			: {type:String},
	postText 			: {type:String},
	comments			: [], // because there are multiple comments 
	totalComments		: {type:Number,default:0},
	totalLikes			: {type:Number,default:0},
	likedBy             : [],
	tags 				: []

});

postSchema.plugin(timestamps);
mongoose.model('Post',postSchema);