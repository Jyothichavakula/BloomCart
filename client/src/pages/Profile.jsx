import {
  FaBox,
  FaMapMarkerAlt,
  FaLock,
  FaHeart,
  FaSignOutAlt,
  FaUserShield
} from "react-icons/fa";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    localStorage.removeItem("user");

    toast.success(
      "Logged out successfully!"
    );

    navigate("/login");

    window.location.reload();

  };

  return (

    <div className="profile-page">

      <div className="profile-card">

        <h1>

          Hello, {user?.name} 👋

        </h1>

        <p>

          Welcome back to BloomCart 🌿

        </p>

        <div className="profile-grid">

          {/* Orders */}

          <div
            className="profile-option-card"
            onClick={() =>
              navigate("/orders")
            }
          >

            <FaBox />

            <h3>

              My Orders

            </h3>

          </div>

          {/* Wishlist */}

          <div
            className="profile-option-card"
            onClick={() =>
              navigate("/wishlist")
            }
          >

            <FaHeart />

            <h3>

              Wishlist

            </h3>

          </div>

          {/* Address */}

          <div
            className="profile-option-card"
            onClick={() =>
              navigate("/address")
            }
          >

            <FaMapMarkerAlt />

            <h3>

              Delivery Address

            </h3>

          </div>

          {/* Change Password */}

          <div
            className="profile-option-card"
            onClick={() =>
              navigate("/change-password")
            }
          >

            <FaLock />

            <h3>

              Change Password

            </h3>

          </div>

          {/* Admin Panel */}

          {

            user?.isAdmin && (

              <div
                className="profile-option-card"
                onClick={() =>
                  navigate("/admin")
                }
              >

                <FaUserShield />

                <h3>

                  Admin Panel

                </h3>

              </div>

            )

          }

        </div>

        <button
          className="logout-profile-btn"
          onClick={handleLogout}
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </div>

  );

}

export default Profile;