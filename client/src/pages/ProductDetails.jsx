import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ProductDetails({
  cart,
  setCart
}) {

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const { id } = useParams();

  const [plant, setPlant] =
    useState(null);

  useEffect(() => {

    fetchPlant();

  }, []);

  const fetchPlant = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/plants/${id}`
      );

      setPlant(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const addToCart = () => {

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

    } else {

      setCart([
        ...cart,
        {
          ...plant,
          quantity: 1
        }
      ]);

    }

    toast.success(
      `${plant.name} added to cart 🌱`
    );

  };

  const submitReview = () => {

    if (!comment.trim()) {

      toast.error(
        "Please write a review"
      );

      return;

    }

    toast.success(
      "Review submitted successfully ⭐"
    );

    setComment("");

    setRating(5);

  };

  if (!plant) {

    return <h1>Loading...</h1>;

  }

  return (

    <div className="details-page container">

  <div className="details-container">

        {/* IMAGE */}

        <div className="details-image">

          <img
            src={plant.image}
            alt={plant.name}
          />

        </div>

        {/* CONTENT */}

        <div className="details-content">

          <h1>
            {plant.name}
          </h1>

          <h2>
            ₹ {plant.price}
          </h2>

          <p>
            {plant.description}
          </p>

          {/* CARE TIPS */}

          <div className="care-box">

            <h3>
              Plant Care Tips 🌿
            </h3>

            <ul>

              <li>
                Water twice a week
              </li>

              <li>
                Keep in indirect sunlight
              </li>

              <li>
                Use organic fertilizer
              </li>

              <li>
                Maintain room temperature
              </li>

            </ul>

          </div>

          {/* ADD TO CART */}

          <button
            onClick={addToCart}
          >

            Add To Cart

          </button>

          {/* REVIEW FORM */}

         <div className="review-section">

  <h2>
    Leave A Review ⭐
  </h2>

  <div className="review-form">

    <select
      value={rating}
      onChange={(e) =>
        setRating(e.target.value)
      }
    >
      <option value="5">
        5 Stars
      </option>

      <option value="4">
        4 Stars
      </option>

      <option value="3">
        3 Stars
      </option>

      <option value="2">
        2 Stars
      </option>

      <option value="1">
        1 Star
      </option>

    </select>

    <textarea
      value={comment}
      onChange={(e) =>
        setComment(e.target.value)
      }
      placeholder="Write your review..."
    />

    <button
      onClick={submitReview}
      className="review-btn"
    >
      Submit Review
    </button>

  </div>

</div>

          {/* CUSTOMER REVIEWS */}

          <div className="customer-reviews">

            <h2>
              Customer Reviews
            </h2>

            {

              plant.ratings?.length > 0 ? (

                plant.ratings.map(
                  (
                    review,
                    index
                  ) => (

                    <div
                      key={index}
                      className="review-card"
                    >

                      <p>

                        ⭐ {review.rating}

                      </p>

                      <p>

                        {review.comment}

                      </p>

                      <p>

                        - {review.user}

                      </p>

                    </div>

                  )
                )

              ) : (

                <p>

                  No reviews yet.

                </p>

              )

            }

          </div>

        </div>

      </div>

    </div>

  );

}

export default ProductDetails;