const ExpressError = require("./utils/ExpressError")
const listing = require("./models/listing")
const review = require("./models/review")
const { rewiewSchema ,listingSchema } = require("./schema");


module.exports.isloggedIn = (req,res,next) => {
      if(!req.isAuthenticated()){
      req.session.redirectUrl  = req.originalUrl;
      req.flash("error","you must be logged")
      return res.redirect("/test/login")
   }
   next()
}

module.exports.saveRedirectUrl = (req,res,next)=>{
   if( req.session.redirectUrl ){
      res.locals.redirectUrl = req.session.redirectUrl;
   } next()
}

module.exports.isOwner = async (req , res , next ) =>{
    let list = await listing.findById(req.params.id)
    if (!list.owner._id.equals(req.user._id)){

     req.flash("error","you dont have permition");
     return res.redirect(`/listing/show/${req.params.id}`);
   }
   next()
}

module.exports.validatereview = (req, res, next)=> {
  const { error } = rewiewSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }

  next();
}

module.exports.validateListing=(req,res,next)=>{

   const {error} = listingSchema.validate(req.body);

   if(error){
      let errMsg = error.details.map(el => el.message).join(",");
      throw new ExpressError(400, errMsg);
   }

   next();
}

module.exports.reviewoned = async (req , res , next ) =>{
    let rev = await review.findById(req.params.reviewId)
    console.log(rev)
    if (!rev.owner.equals(req.user._id)){
   
     req.flash("error","you dont have permition");
     return res.redirect(`/listing/show/${req.params.id}`);
   }
  
   next()
}