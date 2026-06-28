import { useEffect, useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

function AdminOrders() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {
    

    try {

      const res = await axios.get(

        "http://localhost:5000/api/orders"

      );

      setOrders(res.data);

    }

    catch(error){

      console.log(error);

    }

  };

  const updateStatus = async (

    id,

    status

  ) => {

    try {

      await axios.put(

        `http://localhost:5000/api/orders/${id}`,

        { status }

      );

      toast.success(

        "Order Updated 📦"

      );

      fetchOrders();

    }

    catch(error){

      toast.error(

        "Update Failed"

      );

    }

  };

  return (

    <div className="admin-page">

      <h1>

        Manage Orders 📦

      </h1>

      {

        orders.map((order) => (

          <div

            className="order-card"

            key={order._id}

          >

            <h3>

              {order.fullName}

            </h3>

            <p>

              ₹ {order.totalAmount}

            </p>

            <select

  value={order.status}

  onChange={(e) =>

    updateStatus(

      order._id,

      e.target.value

    )

  }

>

  <option value="Pending">
    Pending
  </option>

  <option value="Processing">
    Processing
  </option>

  <option value="Shipped">
    Shipped
  </option>

  <option value="Delivered">
    Delivered
  </option>

</select>

            <button

              onClick={() =>

                updateStatus(

                  order._id,

                  "Shipped"

                )

              }

            >

              Mark Shipped

            </button>

            <button

              onClick={() =>

                updateStatus(

                  order._id,

                  "Delivered"

                )

              }

            >

              Mark Delivered

            </button>

          </div>

        ))

      }

    </div>

  );

}

export default AdminOrders;

