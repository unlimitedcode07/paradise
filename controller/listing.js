const listing = require("../models/listing")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapTokens = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapTokens })


module.exports.index = async (req, res) => {
  let { category, search } = req.query;

  let query = {};

  // 🔍 SEARCH
  if (search && search.trim() !== "") {
    search = search.trim();

    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } }
    ];
  }

  // 📂 CATEGORY
  if (category) {
    query.category = category;
  }

  // 🧠 FINAL QUERY
  let result = await listing.find(query);

  res.render("./listings/index.ejs", { result });
};

module.exports.showlisting = async (req,res)=>{
   
   let result =  await listing.findById(req.params.id).populate({path:"review",populate:{path:"owner"}}).populate("owner")
   console.log(JSON.stringify(result, null, 2));
   if(!result){
      console.log("does not there ")
     req.flash("error","listing you try to get doesnot exist")
      return res.redirect("/listing")
   } 
   
   res.render("./listings/show",{result})
}

module.exports.getNewForm = (req,res)=>{
 
  res.render("./listings/new")
}

module.exports.postNewForm = async(req,res)=>{


   
   let op = req.body.listing;

     let response = await geocodingClient.forwardGeocode({
     query: req.body.listing.location,
     limit: 1
     }) .send();

   op["geometry"] =response.body.features[0].geometry;
   op["owner"] = req.user._id;
   op["image"] = {
      url: req.file.path,
      filename: req.file.filename
   };
   console.log(op);

   await listing.create(op);

   req.flash("success","New Listing Created")
    res.redirect("/listing");
}

module.exports.getIdedit = async (req,res)=>{
    let result = await listing.findById(req.params.id)
    res.render("./listings/edit",{result})
}

module.exports.putIdEdit = async(req,res)=>{
    
    let op = req.body.listing;

   op["owner"] = req.user._id;

   // ✅ Only update image if file exists
   if (req.file) {
      op["image"] = {
         url: req.file.path,
         filename: req.file.filename
      };
   }

   console.log(op);

   await listing.findByIdAndUpdate(
      req.params.id,
      { $set: op },
      { runValidators: true }
   );
 
   req.flash("success","successfully edited")
   res.redirect(`/listing/show/${req.params.id}`);

}

module.exports.deleteListing = async(req,res)=>{
    await listing.findByIdAndDelete(req.params.id)
    req.flash("success","list deleted")
    res.redirect("/listing")
}




















