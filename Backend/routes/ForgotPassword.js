const forgotPasswordController=require('../controllers/ForgotPassword');
const express=require('express');
const auth=require('../middlewares/auth');


const router=express.Router();

router.get('/sendLink',forgotPasswordController.sendResetLink);

router.patch('/resetLink/:link',forgotPasswordController.resetPassword);

module.exports=router;