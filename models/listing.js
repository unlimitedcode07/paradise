const mongoose = require("mongoose")
const Review = require("./review")

const DEFAULT_IMG = "https://wallpapers.com/images/hd/beautiful-nature-pictures-kbw0wxjsci2twr12.jpg"

let img = function(v){
   if(v == ""){
    return DEFAULT_IMG
   }else{
    return v
   }
} 

// function img(v){
//    return v === "" ? DEFAULT_IMG : v;
// }

const schema = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  image:{
    url:{
       type:String,
       default:DEFAULT_IMG,
       set:img
    },
    filename:{
       type:String,
       default:"XYZ"
    }

  },
  location:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  country:{
    type:String,
    required:true
  },
  review:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Review"
  }],
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  category: {
  type: String,
  required: true,
  enum: [
    "Rooms",
    "Mountain",
    "Castle",
    "Beach",
    "Farm",
    "Arctic",
    "Camping",
    "Forest"
  ]
}
})

schema.post("findOneAndDelete", async (list) => {
  if(list){
    await Review.deleteMany({
      _id: { $in: list.review }
    })
  }
})

const listing = mongoose.model("listing",schema)

module.exports = listing;