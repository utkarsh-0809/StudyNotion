const mongoose=require('mongoose');


const categorySchema=new mongoose.Schema({
  Name:{
    type:String,
    required:true
  },
  Description:{
    type:String,
    required:true
  },
  Course:[{
    type:mongoose.Schema.ObjectId,
    requried:true,
    ref:"Course"
  }]
})

const Category=mongoose.model('Category',categorySchema);

module.exports=Category;