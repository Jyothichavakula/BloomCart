import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function Orders() {

  const [orders, setOrders] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/orders/user/${user.name}`
      );

      setOrders(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="orders-page">

      <h1>My Orders 📦</h1>

      {

        orders.length === 0 ? (

          <h2>No Orders Found</h2>

        ) : (

          orders.map((order) => (

            <div
              className="order-card"
              key={order._id}
            >

              <h3>

                Order ID:
                {order._id}

              </h3>

              <p>

                Date:
                {" "}
                {
                  new Date(
                    order.createdAt
                  ).toLocaleDateString()
                }

              </p>

              {

                order.products.map(
                  (product) => (

                    <div
                      key={product._id}
                    >

                      <p>

                        {product.name}
                        {" "}
                        ×
                        {" "}
                        {
                          product.quantity || 1
                        }

                      </p>

                    </div>

                  )
                )

              }

              <h4>

                Total:
                {" "}
                ₹
                {" "}
                {
                  order.totalAmount
                }

              </h4>

              <p>

                Status:
                {" "}
                {
                  order.status
                }

              </p>

            </div>

          ))

        )

      }

    </div>

  );

}

export default Orders;