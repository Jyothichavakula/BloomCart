import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CategoryPlants({

  cart,

  setCart,

  wishlist,

  setWishlist

}) {
  const { category } = useParams();

  const [plants, setPlants] =
    useState([]);

  useEffect(() => {

    fetchPlants();

  }, [category]);

  const fetchPlants =
  async () => {

    try {

      const res =
        await axios.get(

          "http://localhost:5000/api/plants"

        );

      const filtered =

        res.data.filter(

          plant =>

            plant.category ===
            category

        );

      setPlants(filtered);

    }

    catch(error){

      console.log(error);

    }

  };

  const addToCart = (plant) => {

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

};

const addToWishlist = (plant) => {

  const exists = wishlist.find(
    (item) => item._id === plant._id
  );

  if (!exists) {

    setWishlist([
      ...wishlist,
      plant
    ]);

  }

};

  return (

    <div className="container">

      <h1>

        {category}

      </h1>

      <div className="products-grid">

        {

          plants.map((plant)=>(

            <div

              className="plant-card"

              key={plant._id}

            >

              <img

                src={plant.image}

                alt={plant.name}

              />

              <h2>

                {plant.name}

              </h2>

              <p>

                ₹ {plant.price}

              </p>

              <button

  onClick={(e) => {

    e.stopPropagation();

    addToCart(plant);

  }}

>

  Add To Cart

</button>

<button

  className="wishlist-btn"

  onClick={(e) => {

    e.stopPropagation();

    addToWishlist(plant);

  }}

>

  ❤️ Add To Wishlist

</button>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default CategoryPlants;