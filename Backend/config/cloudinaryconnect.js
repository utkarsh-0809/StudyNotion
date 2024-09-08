// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
exports.cloudinaryConnect=async ()=>{
    try{
       await cloudinary.config({
            cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
            api_key:process.env.CLOUDINARY_API_KEY,
            api_secret:process.env.CLOUDINARY_SECRET_KEY
        });
        console.log('cloudinary connected successfully');
    }
    catch(err){
        console.log(err);
    }

}

// Log the configuration
//console.log(cloudinary.config());