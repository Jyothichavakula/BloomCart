import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import EditPlant from "./pages/EditPlant";

import CategoryPlants
from "./pages/CategoryPlants";



import {
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  useState,
  useEffect
} from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Address from "./pages/Address";
import ChangePassword from "./pages/ChangePassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";

import "./index.css";

import AdminDashboard
from "./pages/AdminDashboard";

import AdminRoute
from "./components/AdminRoute";


import AdminPlants from "./pages/AdminPlants";

import AddPlant from "./pages/AddPlant";


import AdminOrders
from "./pages/AdminOrders";



import AdminUsers
from "./pages/AdminUsers";


import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";


function App() {

  /* CART STATE */

  const [cart, setCart] = useState(

    JSON.parse(

      localStorage.getItem("cart")

    ) || []

  );

  /* WISHLIST STATE */

  const [wishlist, setWishlist] = useState(

    JSON.parse(

      localStorage.getItem("wishlist")

    ) || []

  );

  /* SEARCH STATE */

  const [search, setSearch] =

    useState("");

    const [selectedCategory,
  setSelectedCategory] =
  useState("All");

  /* SAVE CART */

  useEffect(() => {

    localStorage.setItem(

      "cart",

      JSON.stringify(cart)

    );

  }, [cart]);

  /* SAVE WISHLIST */

  useEffect(() => {

    localStorage.setItem(

      "wishlist",

      JSON.stringify(wishlist)

    );

  }, [wishlist]);

  return (

    <BrowserRouter>

      <Navbar
  cart={cart}
  search={search}
  setSearch={setSearch}
  setSelectedCategory={
    setSelectedCategory
  }
/>
      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={
            <Home
  cart={cart}
  setCart={setCart}
  wishlist={wishlist}
  setWishlist={setWishlist}
  search={search}
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
/>
          }
        />

        {/* PRODUCT DETAILS */}

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              cart={cart}
              setCart={setCart}
            />
          }
        />

        {/* CART */}

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
            />
          }
        />

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* PROFILE */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>

              <Profile />

            </ProtectedRoute>
          }
        />

        {/* CHECKOUT */}

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>

              <Checkout
                cart={cart}
                setCart={setCart}
              />

            </ProtectedRoute>
          }
        />

        {/* ORDERS */}

        <Route
          path="/orders"
          element={
            <ProtectedRoute>

              <Orders />

            </ProtectedRoute>
          }
        />

        {/* ADDRESS */}

        <Route
          path="/address"
          element={
            <ProtectedRoute>

              <Address />

            </ProtectedRoute>
          }
        />

        {/* CHANGE PASSWORD */}

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>

              <ChangePassword />

            </ProtectedRoute>
          }
        />

        {/* WISHLIST */}

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>

              <Wishlist
                wishlist={wishlist}
                setWishlist={setWishlist}
                cart={cart}
                setCart={setCart}
              />

            </ProtectedRoute>
          }
        />


        <Route

  path="/admin"

  element={

    <AdminRoute>

      <AdminDashboard />

    </AdminRoute>

  }

/>
<Route
  path="/admin/plants"
  element={
    <AdminRoute>
      <AdminPlants />
    </AdminRoute>
  }
/>

<Route
  path="/admin/add-plant"
  element={
    <AdminRoute>
      <AddPlant />
    </AdminRoute>
  }
/>
<Route
  path="/admin/edit-plant/:id"
  element={
    <AdminRoute>
      <EditPlant />
    </AdminRoute>
  }
/>


<Route
  path="/admin/orders"
  element={
    <AdminRoute>

      <AdminOrders />

    </AdminRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AdminRoute>
      <AdminUsers />
    </AdminRoute>
  }
/>

<Route
  path="/category/:category"
  element={
    <CategoryPlants
      cart={cart}
      setCart={setCart}
      wishlist={wishlist}
      setWishlist={setWishlist}
    />
  }
/>


<Route
  path="/about"
  element={<About />}
/>

<Route
  path="/contact"
  element={<Contact />}
/>

<Route
  path="/faq"
  element={<FAQ />}
/>


</Routes>

      {/* TOAST NOTIFICATIONS */}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />

    </BrowserRouter>

  );

}

export default App;
