var mongoose = require('mongoose');
var Campground = require('./models/campgrounds');
var Comment = require('./models/comment');
var data = [
    {
        name: 'Clouds Rest',
        image: 'https://cdn.stocksnap.io/img-thumbs/960w/HA1RQCRQJ7.jpg',
        description: 'Lorem ipsum dolor sit amet, populo scripserit cu vim, vis no dictas laboramus, te quo congue fastidii erroribus. Quo no natum mediocrem, ut agam meis nec. Usu malis graecis ne, ex his iisque ceteros, fastidii patrioque vis ex. Odio saepe neglegentur at pro, vix libris noster te, pro at invidunt ullamcorper. Graeci audire vivendo sed ad, nobis repudiandae no nec, eu vix vidit scaevola. Ea adhuc phaedrum his, vidit mandamus persecuti id est.'
    },
    {
        name: 'Desert Mesa',
        image: 'https://cdn.stocksnap.io/img-thumbs/280h/AD4M0GTYS8.jpg',
        description: 'Lorem ipsum dolor sit amet, populo scripserit cu vim, vis no dictas laboramus, te quo congue fastidii erroribus. Quo no natum mediocrem, ut agam meis nec. Usu malis graecis ne, ex his iisque ceteros, fastidii patrioque vis ex. Odio saepe neglegentur at pro, vix libris noster te, pro at invidunt ullamcorper. Graeci audire vivendo sed ad, nobis repudiandae no nec, eu vix vidit scaevola. Ea adhuc phaedrum his, vidit mandamus persecuti id est.'
    },
    {
        name: 'Canyon Floor',
        image: 'https://cdn.stocksnap.io/img-thumbs/280h/GGPO5KXPVW.jpg',
        description: 'Lorem ipsum dolor sit amet, populo scripserit cu vim, vis no dictas laboramus, te quo congue fastidii erroribus. Quo no natum mediocrem, ut agam meis nec. Usu malis graecis ne, ex his iisque ceteros, fastidii patrioque vis ex. Odio saepe neglegentur at pro, vix libris noster te, pro at invidunt ullamcorper. Graeci audire vivendo sed ad, nobis repudiandae no nec, eu vix vidit scaevola. Ea adhuc phaedrum his, vidit mandamus persecuti id est.'
    },
];

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log('removed campgrounds'); 
            //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log('added a campground');
                        //create a comment
                        Comment.create(
                            {
                                text: 'This place is great but no internet',
                                author: 'Homer'
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log('Created new comment');
                                }
                            });
                    }
                });
            });
            //add a few comments
        }
    });
}

module.exports = seedDB;

