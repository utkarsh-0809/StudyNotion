const paymentController=require('../controllers/Razorpay');
const express=require('express');
const auth=require('../middlewares/auth');

const router=express.Router();

router.use(auth.checkUserLoggedin);


router.post("/capturePayment",paymentController.createPayment)
router.post("/verifySignature",paymentController.valdiatePayment);

module.exports=router;

