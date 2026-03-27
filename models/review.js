const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    comment: String,
    ratings: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
     owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      }
});

module.exports = mongoose.model("Review", schema);
