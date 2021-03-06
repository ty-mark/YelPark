var express         = require("express"),
    app             = express(),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash"),
    seedDB          = require("./seeds"),
    User            = require("./models/user");

var url = process.env.DATABASEURL || 'mongodb://localhost:27017/yelpcamp_app';
// mongoose.connect('mongodb://localhost:27017/yelpcamp_app', { useNewUrlParser: true });
// mongoose.connect('mongodb://thyang:qy803181@ds029486.mlab.com:29486/yelp_park', { useNewUrlParser: true });
mongoose.connect(url, { useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
// __dirname refers to the current directory
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");
// seedDB();

// Require ROUTES
var commentRoutes   = require("./routes/comments"),
    campgroundRoutes= require("./routes/campgrounds"),
    indexRoutes     = require("./routes/index");

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Kiwi is the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// pass in the user information if logged in
// order matters, should be put at the last
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// =======================================================
// ===================ALL ROUTES==========================
// =======================================================

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp has started!"); 
});