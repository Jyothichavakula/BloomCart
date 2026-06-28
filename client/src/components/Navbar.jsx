import {
  FaShoppingBag,
  FaHome,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

import logo from "../assets/bloomcart-logo.png";
import { useNavigate } from "react-router-dom";

function Navbar({
  cart,
  search,
  setSearch,
  setSelectedCategory
}) {

  const navigate = useNavigate();

  return (

  <>

    <div className="navbar">

      {/* LOGO */}

      <div
        className="logo-container"
        onClick={() => navigate("/")}
      >

        <img
          src={logo}
          alt="BloomCart"
          className="logo-image"
        />

      </div>

      {/* SEARCH */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search plants..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button className="search-btn">
          <FaSearch />
        </button>

      </div>

      {/* RIGHT SECTION */}

      <div className="nav-right">

        <FaHome
          className="nav-icon"
          onClick={() => navigate("/")}
        />

        <FaUserCircle
          className="nav-icon"
          onClick={() =>
            navigate("/profile")
          }
        />

        <div
          className="cart"
          onClick={() =>
            navigate("/cart")
          }
        >

          <FaShoppingBag />

          <span>
            {cart.length}
          </span>

        </div>

      </div>

    </div>

    {/* CATEGORY BAR */}

    <div className="category-nav">

  <span
    onClick={() => {

      navigate("/");

      setSelectedCategory("All");

    }}
  >
    All Plants
  </span>

  <span

  onClick={() =>

    navigate(

      "/category/Indoor Plant"

    )

  }

>

  Indoor Plants

</span>

<span

  onClick={() =>

    navigate(

      "/category/Outdoor Plant"

    )

  }

>

  Outdoor Plants

</span>

<span

  onClick={() =>

    navigate(

      "/category/Succulent"

    )

  }

>

  Succulents

</span>

<span

  onClick={() =>

    navigate(

      "/category/Flowering Plant"

    )

  }

>

  Flowering Plants

</span>

</div>

  </>

);
}

export default Navbar;