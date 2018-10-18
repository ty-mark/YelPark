var express     = require("express"),
    router      = express.Router(),
    middleware  = require("../middleware"),
    Campground  = require("../models/campground");

// INDEX Route
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            req.flash("error", "Park not found");
            res.redirect("back");
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, page: 'campgrounds'});
        }
    });
});

// NEW Route
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new.ejs");
});

// CREATE Route
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {
        name: name, 
        price: price,
        image: image, 
        description: description, 
        author: author
    };
    
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            req.flash("error", "Something went wrong...");
            res.redirect("back");
        } else {
            // redirect back to the campgrounds page
            res.redirect("/campgrounds");
        }
    });
    
});

// SHOW Route (must be after the New Route)
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            req.flash("error", "Park not found");
            res.redirect("back");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            req.flash("error", "Park not found");
            res.redirect("back");
        }
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    // find and update the correct campground
    Campground.findOneAndUpdate({"_id": req.params.id}, req.body.campground, function(err, updatedCampground) {
        if (err) {
            req.flash("error", "Park not found");
            res.redirect("back");
        } else {
            // redirect to somewhere
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findOneAndDelete({"_id": req.params.id}, function(err) {
        if (err) {
            req.flash("error", "Park not found");
            res.redirect("back");
        } else {
            req.flash("success", "Park deleted");
            res.redirect("/campgrounds");
        }
    });
});



module.exports = router;