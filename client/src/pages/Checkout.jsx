import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout({ cart = [], setCart }) {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [formData, setFormData] =
    useState({

      fullName:
        user?.address?.fullName || "",

      phone:
        user?.address?.phone || "",

      address:
        user?.address?.address || "",

      city:
        user?.address?.city || "",

      pincode:
        user?.address?.pincode || "",

      paymentMethod: "COD"

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        if (!user) {

          toast.error(
            "Please login first"
          );

          navigate("/login");

          return;

        }

        if (cart.length === 0) {

          toast.error(
            "Cart is Empty"
          );

          return;

        }

        const totalAmount =
          cart.reduce(

            (total, item) =>

              total +

              item.price *

              (item.quantity || 1),

            0

          );

        const orderData = {

          user: user.name,
          email: user.email,

          products: cart,

          totalAmount,

          fullName:
            formData.fullName,

          phone:
            formData.phone,

          address:
            formData.address,

          city:
            formData.city,

          pincode:
            formData.pincode,

          paymentMethod:
            formData.paymentMethod

            

        };

        // ONLINE PAYMENT

        if (
          formData.paymentMethod ===
          "ONLINE"
        ) {

          const paymentOrder =
            await axios.post(

              "http://localhost:5000/api/payment/create-order",

              {

                amount:
                  totalAmount

              }

            );

          const options = {

            key:
              "rzp_test_T2dAbzK1G5PB4c",

            amount:
              paymentOrder.data.amount,

            currency:
              paymentOrder.data.currency,

            name:
              "BloomCart",

            description:
              "Plant Purchase",

            order_id:
              paymentOrder.data.id,

           handler:
  async function (

    response

  ) {

    try {

      const verifyRes =

        await axios.post(

          "http://localhost:5000/api/payment/verify",

          {

            razorpay_order_id:
              response.razorpay_order_id,

            razorpay_payment_id:
              response.razorpay_payment_id,

            razorpay_signature:
              response.razorpay_signature

          }

        );

      if (

        verifyRes.data.success

      ) {

        toast.success(
          "Payment Verified ✅"
        );

        await axios.post(

          "http://localhost:5000/api/orders",

          orderData

        );

        toast.success(
          "Order Placed Successfully 🎉"
        );

        setCart([]);

        localStorage.removeItem(
          "cart"
        );

        navigate(
          "/orders"
        );

      }

      else {

        toast.error(
          "Payment Verification Failed ❌"
        );

      }

    }

    catch (error) {

      console.log(error);

      toast.error(
        "Payment Verification Failed ❌"
      );

    }

  },

            theme: {

              color:
                "#2e7d32"

            }

          };

          const razorpay =

            new window.Razorpay(
              options
            );

          razorpay.open();

          return;

        }

        // CASH ON DELIVERY

        await axios.post(

          "http://localhost:5000/api/orders",

          orderData

        );

        toast.success(

          "Order Placed Successfully 🎉"

        );

        setCart([]);

        localStorage.removeItem(
          "cart"
        );

        navigate("/orders");

      }

      catch (error) {

        console.log(error);

        toast.error(

          error.response?.data
            ?.message ||

          "Failed to place order"

        );

      }

    };

  return (

    <div className="checkout-container">

      <form

        className="checkout-form"

        onSubmit={handleSubmit}

      >

        <h1>

          Checkout

        </h1>

        <input

          type="text"

          name="fullName"

          placeholder="Full Name"

          value={formData.fullName}

          onChange={handleChange}

          required

        />

        <input

          type="text"

          name="phone"

          placeholder="Phone Number"

          value={formData.phone}

          onChange={handleChange}

          required

        />

        <textarea

          name="address"

          placeholder="Address"

          value={formData.address}

          onChange={handleChange}

          required

        />

        <input

          type="text"

          name="city"

          placeholder="City"

          value={formData.city}

          onChange={handleChange}

          required

        />

        <input

          type="text"

          name="pincode"

          placeholder="Pincode"

          value={formData.pincode}

          onChange={handleChange}

          required

        />

        <select

          name="paymentMethod"

          value={formData.paymentMethod}

          onChange={handleChange}

        >

          <option value="COD">

            Cash On Delivery

          </option>

          <option value="ONLINE">

            Online Payment

          </option>

        </select>

        <button type="submit">

          Place Order

        </button>

      </form>

    </div>

  );

}

export default Checkout;