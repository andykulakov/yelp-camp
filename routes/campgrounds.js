var express = require('express');
var router = express.Router();
var Campground = require('../models/campgrounds');
var middleware = require('../middleware');

//show all campgrounds
router.get('/', function(req, res){
    //get campground from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: allCampgrounds, currentUser: req.user});
        }
    })
    
});

//create new campground
router.post('/', middleware.isLoggedIn, function(req, res){
    //get data from the form and add to object
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            req.flash('success', 'Successfully Added New Campground');
            res.redirect('/campgrounds');
        }
    });
});

//show new campground form
router.get('/new', middleware.isLoggedIn, function(req, res){
   res.render('campgrounds/new'); 
});

//show a campground
router.get('/:id', function(req, res){
    //find a campground with this id
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render a page with this id
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

//edit campground
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render('campgrounds/edit', {campground: foundCampground});
    });
})

//update campground
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
    //find and update the campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect('/campgrounds')
        } else {
            req.flash('success', 'Successfully Edited Campground')
            //redirect somewhere
            res.redirect('/campgrounds/' + req.params.id)
        }
    })
});

//destroy campground
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/campgrounds')
        } else {
            res.redirect('/campgrounds')
        }
    })
});

module.exports = router;