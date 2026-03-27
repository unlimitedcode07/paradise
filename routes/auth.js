const express = require("express");
const router = express.Router({ mergeParams: true });
// const wrapAsync = require("../utils/wrapAsync")
// const ExpressError = require("../utils/ExpressError")
// const userModel = require("../models/user");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware")
const {getSignup,postSignup,getLogin,postLogin,logout} = require("../controller/auth")

router.get("/signup",getSignup)

router.post("/signup",postSignup)

router.get("/login",getLogin)

router.post("/login",saveRedirectUrl,passport.authenticate("local",{
    failureRedirect:"/test/login",failureFlash:true
}),postLogin)

router.get("/logout",logout)

module.exports = router;



