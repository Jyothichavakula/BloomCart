const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

require('dotenv').config();


// ROUTES
const plantRoutes = require('./routes/plantRoutes');

const userRoutes = require('./routes/userRoutes');


const app = express();

const orderRoutes =
require("./routes/orderRoutes");

const adminRoutes =
require("./routes/adminRoutes");

const uploadRoutes =
require("./routes/uploadRoutes");


const paymentRoutes =
require("./routes/paymentRoutes");

// MIDDLEWARE
app.use(cors());

app.use(express.json());


// ROUTES MIDDLEWARE
app.use('/api/plants', plantRoutes);

app.use('/api/users', userRoutes);


// TEST ROUTE
app.get('/', (req, res) => {
    res.send('Plant API Running');
});

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(

  "/api/upload",

  uploadRoutes

);

app.use(

  "/api/payment",

  paymentRoutes

);

// DATABASE CONNECTION
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected");

    app.listen(PORT, () => {

        console.log(`Server running on port ${PORT}`);

    });

})

.catch((error) => {

    console.log(error);

});