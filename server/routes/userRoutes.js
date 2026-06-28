const express = require("express");
const router = express.Router();

const {

    registerUser,

    loginUser,

    updateAddress,

    changePassword,
    getUsers

} = require(
    "../controllers/userController"
);

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Update Address
router.put("/address/:id", updateAddress);
//

router.put(
    "/change-password/:id",
    changePassword
);

router.get("/", getUsers);

module.exports = router;