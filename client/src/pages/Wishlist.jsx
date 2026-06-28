import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Wishlist({

  wishlist,

  setWishlist,

  cart,

  setCart

}) {

  const navigate = useNavigate();

  const removeFromWishlist = (id) => {

    setWishlist(

      wishlist.filter(

        (item) => item._id !== id

      )

    );

    toast.success(

      "Removed from Wishlist ❤️"

    );

  };

  const moveToCart = (plant) => {

    const existing = cart.find(

      (item) => item._id === plant._id

    );

    if (existing) {

      setCart(

        cart.map((item) =>

          item._id === plant._id

            ? {

                ...item,

                quantity:

                  (item.quantity || 1) + 1

              }

            : item

        )

      );

    } else {

      setCart([

        ...cart,

        {

          ...plant,

          quantity: 1

        }

      ]);

    }

    removeFromWishlist(plant._id);

    toast.success(

      `${plant.name} moved to cart 🛒`

    );

  };

  return (

    <div className="wishlist-page">

      <h1 className="wishlist-title">

        My Wishlist ❤️

      </h1>

      {

        wishlist.length === 0 ? (

          <div className="empty-state">

            <h2>

              ❤️ Your Wishlist Is Empty

            </h2>

            <p>

              Save your favorite plants
              and find them here anytime.

            </p>

            <button

              onClick={() =>

                navigate("/")

              }

            >

              Explore Plants 🌿

            </button>

          </div>

        ) : (

          <div className="container">

            <div className="row g-4">

              {

                wishlist.map((item) => (

                  <div

                    key={item._id}

                    className="col-12 col-sm-6 col-md-4 col-lg-3"

                  >

                    <div className="wishlist-card">

                      <img

                        src={item.image}

                        alt={item.name}

                        className="wishlist-image"

                      />

                      <h2>

                        {item.name}

                      </h2>

                      <p>

                        ₹ {item.price}

                      </p>

                      <div className="wishlist-buttons">

                        <button

                          className="cart-btn"

                          onClick={() =>

                            moveToCart(item)

                          }

                        >

                          Add To Cart 🛒

                        </button>

                        <button

                          className="remove-btn"

                          onClick={() =>

                            removeFromWishlist(

                              item._id

                            )

                          }

                        >

                          Remove ❤️

                        </button>

                      </div>

                    </div>

                  </div>

                ))

              }

            </div>

          </div>

        )

      }

    </div>

  );

}

export default Wishlist;