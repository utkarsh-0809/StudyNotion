const Razorpay=require('razorpay');

exports.instance = new Razorpay({
    key_id:process.env.PAYMENT_KEY_ID,
    key_secret:process.env.PAYMENT_KEY_SECRET,
  });