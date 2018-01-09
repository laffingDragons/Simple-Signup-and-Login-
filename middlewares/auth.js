var mongoose = require('mongoose');
var userModel = mongoose.model('User')


// app level middleware to set request user 

exports.checkLogin = function(req,res,next){

	if(!req.session.user){
        //if the user dosent exost, just redirect him to login screen
		res.redirect('/users/login/screen');
	}
	else{
         //if it exist move forward
		next();
	}

}// end checkLogin