
const userModel = require("./models/user")

// packages
const express = require("express");
const app = express();
const ejsmate = require("ejs-mate");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const multer = require("multer");
const upload = multer({dest: "uploads/"})  // auto created uplode folder
require("dotenv").config();

//auth
const passport = require("passport");
const localStrategy = require("passport-local");

const dburl = process.env.ATLASDB_URL;
// mongoose
async function main() {
  await mongoose.connect(dburl);
}

main()
  .then(() => {
    console.log("mongoose connected");

    app.listen(3000, () => {
      console.log("server running on port 3000");
    });
  })
  .catch((err) => console.log(err));

//session
const flash = require("connect-flash")
const session = require("express-session")
const MongoStore = require("connect-mongo").default;
const store = MongoStore.create({
  mongoUrl:dburl,
  crypto:{
    secret:process.env.SECRET
  },
  touchAfter: 24*60*60,

})

store.on("error",(err)=>{
  console.log("Error in mongodb database",err);
})
const sessionopt = {
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now() + 7*24*60*60*1000,//  kitne din bad login ke expire hoga 
// 7 weaks => 7 days , 24 hr , 60 min 60 sec 1000 milisec
   maxAge : 7*24*60*60*1000,
  },
  httpOnly:true, // search coss scripting attacks
}

app.use(session(sessionopt))
app.use(flash());

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(userModel.authenticate()))

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser())

// utils
const ExpressError = require("./utils/ExpressError");

// routers
const reviewRoutes = require("./routes/review");
const listingRoutes = require("./routes/listing");
const authRoutes = require("./routes/auth")

// middleware
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

// ejs setup
app.engine("ejs", ejsmate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));



// home
app.get("/", (req, res) => {
  res.send("working");
});

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
   res.locals.currentUser = req.user;
  next()
})

// routes
app.use("/listing/:id/reviews", reviewRoutes);
app.use("/listing", listingRoutes);
app.use("/test",authRoutes)

app.get("/favicon.ico", (req, res) => res.status(204));
// 404
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});


// error handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;

  if (statusCode === 404) {
    return res.status(statusCode).render("./err/error", { message });
  }

  console.error(err);
  res.status(statusCode).render("./err/error", { message });
});
