import indoorImg from "../assets/categories/indoor.jpeg";
import outdoorImg from "../assets/categories/outdoor.jpg";
import succulentImg from "../assets/categories/succulent.jpg";
import floweringImg from "../assets/categories/flowering.png";


import Footer from "../components/Footer";


import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import img1 from "../assets/slides/img1.png";
import img2 from "../assets/slides/img2.png";
import img3 from "../assets/slides/img3.png";

import { FaHeart } from "react-icons/fa";

import { toast } from "react-toastify";

function Home({

  cart,

  setCart,

  wishlist,

  setWishlist,

  search,

  selectedCategory,

  setSelectedCategory

}) {

  const [plants, setPlants] =
    useState([]);

  const bestSellers =
plants.filter(

  plant =>

    plant.bestSeller

);


const newArrivals =

  [...plants]

    .sort(

      (a,b) =>

        new Date(b.createdAt) -

        new Date(a.createdAt)

    )

    .slice(0,4);
    
  

  const navigate =
    useNavigate();

  const slides = [

    img1,

    img2,

    img3

  ];

  

  const [currentSlide, setCurrentSlide] =
    useState(0);

  useEffect(() => {

    fetchPlants();

  }, []);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentSlide((prev) =>

        (prev + 1) % slides.length

      );

    }, 3000);

    return () =>

      clearInterval(interval);

  }, []);

 const fetchPlants = async () => {

  try {

    const res = await axios.get(
      "http://localhost:5000/api/plants"
    );

    console.log("Plants Data:", res.data);

    setPlants(res.data);

  }

  catch (error) {

    console.log(error);

  }

};

  const addToCart = (plant) => {

    const existing = cart.find(

      (item) =>

        item._id === plant._id

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

    }

    else {

      setCart([

        ...cart,

        {

          ...plant,

          quantity: 1

        }

      ]);

    }

    toast.success(

      `${plant.name}
       added to cart 🛒`

    );

  };

  const addToWishlist = (plant) => {

    const exists = wishlist.find(

      (item) =>

        item._id === plant._id

    );

    if (exists) {

      toast.info(

        "Already in Wishlist ❤️"

      );

      return;

    }

    setWishlist([

      ...wishlist,

      plant

    ]);

    toast.success(

      `${plant.name}
       added to Wishlist ❤️`

    );

  };

  const filteredPlants =
  plants.filter((plant) => {

    const matchesSearch =

      plant.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesCategory =

      selectedCategory ===
      "All"

        ? true

        : plant.category ===
          selectedCategory;

    return (

      matchesSearch &&

      matchesCategory

    );

  });
  return (

    <div>

      {/* HERO SLIDER */}

      <div className="hero-slider">

        <img

          src={slides[currentSlide]}

          alt="Banner"

          className="hero-slide"

        />

        <button

          className="shop-now-btn"

          onClick={() => {

            document

              .querySelector(

                ".products-section"

              )

              ?.scrollIntoView({

                behavior: "smooth"

              });

          }}

        >

          Shop Now

        </button>

        <div

          className="slider-dots"

        >

          {

            slides.map((_, index) => (

              <span

                key={index}

                className={

                  currentSlide === index

                    ? "dot active"

                    : "dot"

                }

                onClick={() =>

                  setCurrentSlide(index)

                }

              />

            ))

          }

        </div>

      </div>

      {/* PRODUCTS */}

      <div className="products-section">

        <div className="features-heading">

  <h1>

    Why Choose BloomCart? 🌿

  </h1>

  <p>

    Bringing nature closer to your home with healthy plants,
    secure shopping, and reliable delivery.

  </p>


</div>

  
        <div className="features-section">

  <div className="feature-card">

    <h2>🌿 Fresh Plants</h2>

    <p>
      Carefully selected healthy plants delivered to your doorstep.
    </p>

  </div>

  <div className="feature-card">

    <h2>🚚 Fast Delivery</h2>

    <p>
      Quick and safe delivery across India.
    </p>

  </div>

  <div className="feature-card">

    <h2>🔒 Secure Payments</h2>

    <p>
      Pay safely using Razorpay and Cash On Delivery.
    </p>

  </div>

  <div className="feature-card">

    <h2>💚 Plant Care Support</h2>

    <p>
      Get tips and guidance to keep your plants healthy.
    </p>

  </div>

</div>

<div className="shop-category-section">

  <h1>
    Shop By Category 🌿
  </h1>

  <p>
    Explore our carefully selected collection of plants for every space and lifestyle.
  </p>

  <div className="category-grid">

    <div
      className="category-card"
      onClick={() =>
  navigate("/category/Indoor Plant")
}
    >

      <img
        src={indoorImg}
        alt="Indoor Plants"
      />

      <h2>
        Indoor Plants
      </h2>

    </div>

    <div
      className="category-card"
      onClick={() =>
  navigate("/category/Outdoor Plant")
}
    >

      <img
        src={outdoorImg}
        alt="Outdoor Plants"
      />

      <h2>
        Outdoor Plants
      </h2>

    </div>

    <div
      className="category-card"
      onClick={() =>
  navigate("/category/Succulent")
}
    >

      <img
        src={succulentImg}
        alt="Succulents"
      />

      <h2>
        Succulents
      </h2>

    </div>

    <div
      className="category-card"
     onClick={() =>
  navigate("/category/Flowering Plant")
}
    >

      <img
        src={floweringImg}
        alt="Flowering Plants"
      />

      <h2>
        Flowering Plants
      </h2>

    </div>

  </div>

</div>
<div className="reviews-section">

  <h1>
    What Our Customers Say 💚
  </h1>

  <p>
    Thousands of plant lovers trust BloomCart.
  </p>

  <div className="reviews-grid">

    <div className="review-card">

      <h3>
        ⭐⭐⭐⭐⭐
      </h3>

      <p>
        Beautiful plants and very fast delivery.
        My living room looks amazing now!
      </p>

      <h4>
        — Priya Sharma
      </h4>

    </div>

    <div className="review-card">

      <h3>
        ⭐⭐⭐⭐⭐
      </h3>

      <p>
        Plants arrived healthy and well packed.
        Definitely ordering again.
      </p>

      <h4>
        — Rahul Verma
      </h4>

    </div>

    <div className="review-card">

      <h3>
        ⭐⭐⭐⭐⭐
      </h3>

      <p>
        Excellent customer support and quality plants.
      </p>

      <h4>
        — Sneha Patel
      </h4>

    </div>

  </div>

</div>



<div className="newsletter-section">

  <h1>
    Stay Updated 🌿
  </h1>

  <p>
    Subscribe to receive plant care tips,
    special offers, and new arrivals.
  </p>

  <div className="newsletter-form">

    <input
      type="email"
      placeholder="Enter your email"
    />

    <button>

      Subscribe

    </button>

  </div>

</div>

<div className="new-arrivals-section">

  <h1>

     New Arrivals

  </h1>

  <p>

    Freshly added plants.

  </p>

<div className="container">

  <div className="row g-4">

    {
      newArrivals.map((plant) => (

        <div
          key={plant._id}
          className="col-12 col-sm-6 col-md-4 col-lg-3"
        >

          <div
            className="plant-card"
            onClick={() =>
              navigate(`/product/${plant._id}`)
            }
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

          </div>

        </div>

      ))
    }

  </div>

</div>

</div>

{/* BEST SELLERS */}

<div className="best-seller-section">

  <h1>
    🔥 Best Sellers
  </h1>

  <p>
    Most loved plants by our customers.
  </p>

  <div className="container">

    <div className="row g-4">

      {
        bestSellers.map((plant) => (

          <div
            key={plant._id}
            className="col-12 col-sm-6 col-md-4 col-lg-3"
          >

            <div className="plant-card">

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

            </div>

          </div>

        ))
      }

    </div>

  </div>

</div>

<h1 className="section-title">

  Our Plants 🌱

</h1>

<div className="container">

  <div className="row g-4">

    {
      filteredPlants.map((plant) => (

        <div
          key={plant._id}
          className="col-12 col-sm-6 col-md-4 col-lg-3"
        >

          <div
            className="plant-card"
            onClick={() =>
              navigate(`/product/${plant._id}`)
            }
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
              <FaHeart />
              Add To Wishlist
            </button>

          </div>

        </div>

      ))
    }

  </div>

</div>

</div>

<Footer />

    </div>

  );

}


export default Home;