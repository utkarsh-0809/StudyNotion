const profileController=require('../controllers/Profile');
const express=require('express');
const auth=require('../middlewares/auth');


const router=express.Router();

router.use(auth.checkUserLoggedin)

router
.patch('/update',profileController.updateProfile)
.delete('/delete',profileController.deleteProfile)
.get('/details',profileController.getAllDetails)
.patch('/updateImage',profileController.uploadImage);


module.exports=router;