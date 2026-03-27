const Listing = require("../models/listing")
const Review = require("../models/review")

module.exports.createReview = async (req, res) => {
    let list = await Listing.findById(req.params.id);
    let op = req.body.review
    op["owner"] = req.user._id
    let review = new Review(op);

    list.review.push(review);

    await review.save();
    await list.save();

    console.log("review added");
    req.flash("success","New review Created")
    console.log(list)
    res.redirect(`/listing/show/${req.params.id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
      $pull: { review: reviewId },
    });

    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted !")
    res.redirect(`/listing/show/${id}`);
}  