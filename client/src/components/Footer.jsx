import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Footer() {

  const navigate = useNavigate();

  return (

    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}

        <div className="footer-section">

          <h2>BloomCart 🌿</h2>

          <p>
            Bringing nature closer to your home.

            Discover healthy plants, beautiful

            gardens, and greener living.

          </p>

        </div>

        {/* QUICK LINKS */}

        <ul>

 <li
  className="footer-link"
  onClick={() => {

    navigate("/");

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  }}
>

  Home

</li>
  <li
    className="footer-link"
    onClick={() => navigate("/about")}
  >
    About Us
  </li>

  <li
    className="footer-link"
    onClick={() => navigate("/contact")}
  >
    Contact Us
  </li>

  <li
    className="footer-link"
    onClick={() => navigate("/faq")}
  >
    FAQ
  </li>

  <li
    className="footer-link"
    onClick={() => navigate("/cart")}
  >
    Cart
  </li>

  <li
    className="footer-link"
    onClick={() => navigate("/wishlist")}
  >
    Wishlist
  </li>

</ul>

        {/* SOCIAL MEDIA */}

        <div className="footer-section">

          <h3>Follow Us</h3>

          <div className="social-icons">

            <FaFacebook

              onClick={() =>
                window.open(
                  "https://facebook.com",
                  "_blank"
                )
              }

            />

            <FaInstagram

              onClick={() =>
                window.open(
                  "https://instagram.com",
                  "_blank"
                )
              }

            />

            <FaLinkedin

              onClick={() =>
                window.open(
                  "https://linkedin.com",
                  "_blank"
                )
              }

            />


            

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 BloomCart.

        All Rights Reserved.

      </div>

    </footer>

  );

}

export default Footer;