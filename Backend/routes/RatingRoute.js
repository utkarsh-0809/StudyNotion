const ratingController=require('../controllers/RatingAndReview');
const express=require('express');
const auth=require('../middlewares/auth');

const router=express.Router();


router
.post('/create',auth.checkUserLoggedin,ratingController.createRating)
.get('/average',ratingController.averageRating)
.get('/all',ratingController.getAllRatingReview);

module.exports=router;

