var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");
    
mongoose.connect('mongodb://localhost:27017/yelpcamp_app', { useNewUrlParser: true });

var data = [
    {
        name: "White Sand",
        image: "https://images.unsplash.com/photo-1524954649203-0a1bfb168995?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4accddf4a7eabaa2ce6228440bea082b&auto=format&fit=crop&w=400&q=60",
        description: "Great wave-like dunes of gypsum sand have engulfed 275 square miles of desert, creating the world's largest gypsum dunefield."
    },
    {
        name: "Yellowstone",
        image: "https://images.unsplash.com/photo-1533419784160-1f7f79022119?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjF9&s=03792ed030e4e97b201112c17044af14&auto=format&fit=crop&w=400&q=60",
        description: "Yellowstone was the first national park in the U.S. and is also widely held to be the first national park in the world. The park is known for its wildlife and its many geothermal features, especially Old Faithful geyser, one of its most popular features. It has many types of ecosystems, but the subalpine forest is the most abundant. It is part of the South Central Rockies forests ecoregion."
    },
    {
        name: "Yosemite",
        image: "https://images.unsplash.com/photo-1517054612019-1bf855127c43?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e4814eb541ddb4ef86140974f1bee831&auto=format&fit=crop&w=400&q=60",
        description: "Designated a World Heritage Site in 1984, Yosemite is internationally recognized for its granite cliffs, waterfalls, clear streams, giant sequoia groves, lakes, mountains, meadows, glaciers, and biological diversity. Almost 95% of the park is designated wilderness."
    }
];

var commentData = {
    text: "Great views and fresh air!",
    author: "Kiwi"
};


function seedDB() {
    // Remove all campgrounds
    Campground.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("campgrounds removed!");
            // add a few campgrounds
            // data.forEach(function(seed) {
            //     Campground.create(seed, function(err, campground) {
            //         if (err) {
            //             console.log(err);
            //         } else {
            //             console.log("campgrounds added!");
            //             Comment.create(commentData, function(err, comment) {
            //                 if (err) {
            //                     console.log(err);
            //                 } else {
            //                     campground.comments.push(comment);
            //                     campground.save();
            //                     console.log("comments added!");
            //                 }
            //             });
            //         }
            //     });
                
            // });
        }
    });
}

module.exports = seedDB;