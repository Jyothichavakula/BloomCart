import {
  useState,
  useEffect
} from "react";

import axios from "axios";

function Address() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [formData, setFormData] =
    useState({

      fullName: "",

      phone: "",

      address: "",

      city: "",

      pincode: ""

    });

  useEffect(() => {

    if (user?.address) {

      setFormData(user.address);

    }

  }, []);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await axios.put(

            `${import.meta.env.VITE_API_URL}/api/users/address/${user._id}`,

            formData

          );

        localStorage.setItem(

          "user",

          JSON.stringify(res.data)

        );

       toast.success(
  "Address Saved 📍"
);

      }

      catch (error) {

        alert(
          "Failed To Save"
        );

      }

    };

  return (

    <div className="address-page">

      <div className="address-card">

        <h1>

          Delivery Address

        </h1>

        <form
          className="address-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />

          <div className="address-row">

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              required
            />

          </div>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Full Address"
            required
          />

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
          />

          <button
            className="save-address-btn"
            type="submit"
          >

            Save Address

          </button>

        </form>

      </div>

    </div>

  );

}

export default Address;