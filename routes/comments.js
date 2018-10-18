var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    middleware  = require("../middleware"),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

// ===============
// COMMENT Routes
// ===============

// NEW Comment
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            req.flash("error", "Park not found");
            res.redirect("back");
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// CREATE Comment
router.post("/", middleware.isLoggedIn, function(req, res) {
    // lookup campground using id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            req.flash("error", "Park not found");
            res.redirect("back");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong...");
                    res.redirect("back");
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect to the campground show page
                    req.flash("success", "Successfully added comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// EDIT Comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            req.flash("error", "Comment not found");
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE Comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findOneAndUpdate({"_id": req.params.comment_id}, req.body.comment, function(err, updatedComment) {
        if (err) {
            req.flash("error", "Comment not found");
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY Comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    // find the comment by id and remove
    Comment.findOneAndDelete({"_id": req.params.comment_id}, function(err) {
        if (err) {
            req.flash("error", "Comment not found");
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});




module.exports = router;