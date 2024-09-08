const mongoose=require('mongoose');
const validator = require("email-validator");

const ratingAndReviewSchema=new mongoose.Schema({
  User:{
    type:mongoose.Schema.ObjectId,
    ref:"user",
    required:true
  },
  Rating:{
    type:Number,
    required:true
  },
  Review:{
    type:String,
  },
  Course:{
    type:mongoose.Schema.ObjectId,
    ref:"Course",
    required:true
  }
})

const RatingsAndReviews=mongoose.model('RatingsAndReviews',ratingAndReviewSchema);

module.exports=RatingsAndReviews;