var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user");


router.get("/", function(req, res){
    res.render("landing");
});

// ===================
// AUTHENTICATE Routes
// ===================

router.get("/register", function(req, res) {
    res.render("register", {page: 'register'});
});

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    // pass in the username and the password separately,
    // cause the passport will hash the password into some giant strings
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            // if (newUser.username.length > 0) {
            //     req.flash("error", "User existed, try another username");
            // } else {
            //     req.flash("error", "Username cannot be empty");
            // }
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to YelpPark, " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login", function(req, res) {
    res.render("login", {page: 'login'});
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out, see you next time!");
    res.redirect("/campgrounds");
});

module.exports = router;