const Order = require("../models/Order");
const transporter =
require("../config/mail");

// CREATE ORDER

const createOrder = async (req, res) => {

  try {

    const order = await Order.create(
      req.body
    );

    // SEND EMAIL

    if (req.body.email) {

      await transporter.sendMail({

        from:
          process.env.EMAIL_USER,

        to:
          req.body.email,

        subject:
          "BloomCart Order Confirmation 🌿",

        html: `

          <h2>Order Confirmed ✅</h2>

          <p>
            Hello ${req.body.user},
          </p>

          <p>
            Thank you for shopping with BloomCart 🌱
          </p>

          <p>
            <strong>Order ID:</strong>
            ${order._id}
          </p>

          <p>
            <strong>Total Amount:</strong>
            ₹${order.totalAmount}
          </p>

          <p>
            Your order has been received and is being processed.
          </p>

        `

      });

    }

    res.status(201).json(order);

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};
// GET ALL ORDERS (Admin)

const getOrders = async (req,res) => {

  try {

    const orders =
      await Order.find()

      .sort({ createdAt: -1 });

    res.json(orders);

  }

  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};


// GET ORDERS OF LOGGED-IN USER
const getUserOrders = async (req, res) => {

  try {

    const orders = await Order.find({

      user: req.params.name

    });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
const updateOrderStatus = async (req,res)=>{

  try{

    const order =
      await Order.findByIdAndUpdate(

        req.params.id,

        {

          status:req.body.status

        },

        {

          new:true

        }

      );

    res.json(order);

  }

  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};


module.exports = {

  createOrder,
  getOrders,
  getUserOrders,
  updateOrderStatus
};