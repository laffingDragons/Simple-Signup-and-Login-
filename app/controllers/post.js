var mongoose = require('mongoose');
var express = require('express');

// express router // used to define routes 
var userRouter  = express.Router();
var postModel = mongoose.model('Post')
var responseGenerator = require('./../../libs/responseGenerator');
var auth = require("./../../middlewares/auth");


module.exports.controllerFunction = function(app) {

   //FOr testing database
      userRouter.get('/all', function (req, res) {
        postModel.find({}, function (err, allPosts) {
            if (err) {
                res.send(err);
            } else {

                res.send(allPosts);

            }

        }); //end user model find 

    }); //end get all users
   // route to create a post
    userRouter.post('/create', function (req, res) {

        if (req.body.postText != undefined) {

            var newPost = new postModel({
                userName: req.body.userName,
                fullName: req.body.fullName,
                postText: req.body.postText,

            }); 
            
              var allTags = (req.body.allTags != undefined && req.body.allTags != null) ? req.body.allTags.split(',') : '';
              newPost.tags = allTags;
            
            
            newPost.save(function (err) {
                if (err) {

                    var myResponse = responseGenerator.generate(true, "some error" + err, 500, null);
                    //res.send(myResponse);
                    res.render('error', {
                        message: myResponse.message,
                        error: myResponse.data
                    });

                } else {

                    //var myResponse = responseGenerator.generate(false,"successfully signup user",200,newPost);
                    // res.send(myResponse);
                    //req.session.user = newPost;//request.session golbal var 
                    
                    //deleting because if any hacker hacks into the database he can get only tempory access.
                    
                    //delete req.session.user.password;
                    res.redirect('/posts/all')
                }

            }); //end new user save


        } else {

            var myResponse = {
                error: true,
                message: "Please enter your What's on your mind ?",
                status: 403,
                data: null
            };

            //res.send(myResponse);

            res.render('error', {
                message: myResponse.message,
                error: myResponse.data
            });

        }


    }); //end get all users
   // route to edit a post 
   // route to get a post by _id
   //route to like a post 
   // route to comment on a post 
   //route to get all posts by a user using userName
   // route to get all posts by logged in user



 
    app.use('/posts', userRouter);



 
} //end contoller code
