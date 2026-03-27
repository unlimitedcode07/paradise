const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;
const schema = new mongoose.Schema({
   email:{
    type:String,
    required: true
   }
});


schema.plugin(passportLocalMongoose); // ye kyu use kiya kyu kai 
// ye atomaticaly  username hashing  solting hash pass in sabko ato fill kar ta hai 

module.exports = mongoose.model("User", schema);
