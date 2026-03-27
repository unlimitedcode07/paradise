const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

const wrapAsync = require("../utils/wrapAsync")
//const ExpressError = require("../utils/ExpressError")
//const { listingSchema ,rewiewSchema} = require("../schema.js");
// const listing = require("../models/listing")
const { isloggedIn, isOwner,validateListing } = require("../middleware.js");
const { index ,showlisting,getNewForm,postNewForm,getIdedit,putIdEdit,deleteListing } = require("../controller/listing.js")
 
router.get("/",wrapAsync(index))
//
router.get("/show/:id",wrapAsync(showlisting))

//
router.get("/new",isloggedIn,getNewForm)

router.post("/new",
upload.single("listing[image]"), 
validateListing,
wrapAsync(postNewForm));


router.get("/edit/:id",isloggedIn,isOwner,wrapAsync(getIdedit))

router.put("/edit/:id",
upload.single("listing[image]"), 
validateListing,
wrapAsync(putIdEdit));

router.delete("/delete/:id",isloggedIn,isOwner,wrapAsync(deleteListing))



module.exports = router;
