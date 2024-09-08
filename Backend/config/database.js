const mongoose=require('mongoose');

require("dotenv").config;

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>console.log("db Connection Successfull"))
    .catch(err=>{
        console.log("db connection failed due to:")
        console.log(err)
    })
}