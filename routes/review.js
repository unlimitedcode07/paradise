const express = require("express");
const router = express.Router({ mergeParams: true });
const { isloggedIn ,validatereview,reviewoned} = require("../middleware.js")
// const Listing = require("../models/listing");
// const Review = require("../models/review");
const { createReview , deleteReview} = require("../controller/review")
const wrapAsync = require("../utils/wrapAsync");


// CREATE REVIEW
router.post(
  "/",isloggedIn,
  validatereview,
  wrapAsync(createReview)
);

// DELETE REVIEW
router.delete(
  "/:reviewId",reviewoned,
  wrapAsync(deleteReview)
);

module.exports = router;


