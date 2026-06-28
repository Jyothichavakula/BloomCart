const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrders,
  getUserOrders,
  updateOrderStatus
} = require("../controllers/orderController");
// CREATE NEW ORDER
router.post("/", createOrder);
 
// GET ALL ORDERS (Admin)
router.get("/", getOrders);


// GET ORDERS OF A SPECIFIC USER
router.get(
  "/user/:name",
  getUserOrders
);

router.get("/", getOrders);

router.put(
  "/:id",
  updateOrderStatus
);


module.exports = router;