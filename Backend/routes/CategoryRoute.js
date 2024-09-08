const categoryController=require('../controllers/Category');
const express=require('express');
const auth=require('../middlewares/auth');

const router=express.Router();

router.use(auth.checkUserLoggedin);

router
.post('/create',auth.restrictTo(['Admin']),categoryController.createCategory)
.get('/all',categoryController.getAllCategory)
.get('/details',categoryController.categoryPageDetails);

module.exports=router;