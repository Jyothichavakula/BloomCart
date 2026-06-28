const razorpay =
require("../config/razorpay");

const crypto =
require("crypto");

// CREATE RAZORPAY ORDER

const createOrder =
async (req,res)=>{

  try{

    const options = {

      amount:
        req.body.amount * 100,

      currency:"INR"

    };

    const order =
      await razorpay.orders.create(
        options
      );

    res.json(order);

  }

  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};

// VERIFY PAYMENT

const verifyPayment =
async (req,res)=>{

  

  try{

    const {

      razorpay_order_id,

      razorpay_payment_id,

      razorpay_signature

    } = req.body;

    const sign =

      razorpay_order_id +

      "|" +

      razorpay_payment_id;

    const expectedSignature =

      crypto

        .createHmac(

          "sha256",

          process.env
            .RAZORPAY_KEY_SECRET

        )

        .update(sign)

        .digest("hex");

    if(

      expectedSignature ===

      razorpay_signature

    ){

      res.json({

        success:true,

        message:
          "Payment Verified"

      });

    }

    else{

      res.status(400).json({

        success:false,

        message:
          "Invalid Signature"

      });

    }

  }

  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};

module.exports = {

  createOrder,

  verifyPayment

};
