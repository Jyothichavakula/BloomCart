import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {

  const navigate = useNavigate();

  const increaseQuantity = (id) => {

    const updatedCart = cart.map((item) =>

      item._id === id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item

    );

    setCart(updatedCart);

  };

  const decreaseQuantity = (id) => {

    const updatedCart = cart.map((item) =>

      item._id === id
        ? {
            ...item,
            quantity: Math.max(
              (item.quantity || 1) - 1,
              1
            )
          }
        : item

    );

    setCart(updatedCart);

  };

  const removeItem = (id) => {

    const updatedCart = cart.filter(
      (item) => item._id !== id
    );

    setCart(updatedCart);

  };

  const totalPrice = cart.reduce(

    (total, item) =>

      total +
      item.price *
      (item.quantity || 1),

    0

  );

  return (

    <div className="cart-page">

      <h1>Shopping Cart 🛒</h1>

      {cart.length === 0 ? (

        <h2>Cart is Empty</h2>

      ) : (

        <>

          {cart.map((item) => (

            <div
              className="cart-item"
              key={item._id}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-info">

                <h2>{item.name}</h2>

                <h3>₹ {item.price}</h3>

              </div>

              <div className="quantity-box">

                <button
                  onClick={() =>
                    decreaseQuantity(
                      item._id
                    )
                  }
                >
                  -
                </button>

                <span>
                  {item.quantity || 1}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(
                      item._id
                    )
                  }
                >
                  +
                </button>

              </div>

              <button
                className="remove-btn"
                onClick={() =>
                  removeItem(item._id)
                }
              >
                Remove
              </button>

            </div>

          ))}

          <div className="cart-total">

            <h2>

              Total: ₹ {totalPrice}

            </h2>

            <button
              className="checkout-btn"
              onClick={() =>
                navigate("/checkout")
              }
            >

              Proceed To Checkout

            </button>

          </div>

        </>

      )}

    </div>

  );

}

export default Cart;