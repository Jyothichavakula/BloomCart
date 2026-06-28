const Plant = require("../models/Plant");

const Order = require("../models/Order");

const User = require("../models/User");

const getDashboardStats = async (

  req,

  res

) => {

  try {

    const totalPlants =
      await Plant.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const totalUsers =
      await User.countDocuments();

    const orders =
      await Order.find();

    const totalRevenue =
      orders.reduce(

        (total, order) =>

          total +

          (order.totalAmount || 0),

        0

      );

    res.json({

      totalPlants,

      totalOrders,

      totalUsers,

      totalRevenue

    });

  }

  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};

module.exports = {

  getDashboardStats

};