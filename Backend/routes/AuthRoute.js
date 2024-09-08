const authController=require('../controllers/Auth');
const express=require('express');
const auth=require('../middlewares/auth');

const router=express.Router();

router
.post('/sendOtp',authController.sendOtp)
.post('/signup',authController.signup)
.get('/login',authController.login)
.patch('/changePassword',authController.changePassword);

module.exports=router;
