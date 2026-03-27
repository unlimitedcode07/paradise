const userModel = require("../models/user") 

module.exports.getSignup = (req,res)=>{
    res.render("./auth/signup")
}

module.exports.postSignup = async (req,res)=>{
    try{
    let { username ,email, password} = req.body.User;
    let demouser = new userModel({
        email:email,
        username:username
    })
   let newuser =  await userModel.register(demouser,password);
   req.login(newuser,(err)=>{
    if(err) return next(err)
        req.flash("success","welcome to Turest")
    res.redirect("/listing")
   })
    }catch(err){
      req.flash("error",err.message);
      res.redirect("/test/signup")
    }  
}

module.exports.getLogin = (req,res)=>{
    res.render("./auth/login")
}

module.exports.postLogin = async(req,res)=>{
    req.flash("success","welcome to paradise you are in ");
    let redirecturl = res.locals.redirectUrl || "/listing"
    res.redirect(redirecturl)
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","you are logged out");
        res.redirect("/listing")
    })
}