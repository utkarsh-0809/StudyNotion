const cloudinary=require('cloudinary').v2;

exports.imageUpload=async(file,folder,height,quality)=>{
    try{
        folder=folder||process.env.FOLDER_NAME;
        const options={folder};

        if(height)
            options.height=height;
        if(quality)
            options.quality=quality

        const supportedTags=['jpeg','jpg','png','mp4'];

        const fileType=file.name.split('.')[1].toLowerCase();

        let check=supportedTags.includes(fileType);

        if(!check){
            // res.status(400).json({
            //     status:"fail",
            //     message:"file type not supported"
            // })
            return ;
        }
        if(fileType==='mp4'){
            options.resource_type="video"
        }
        return await cloudinary.uploader.upload(file.tempFilePath,options)
    }
    catch(err){
        console.log(err);
    }
}