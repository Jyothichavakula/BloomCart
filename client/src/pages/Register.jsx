import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          "http://localhost:5000/api/users/register",
          {
            name,
            email,
            password,
          }
        );

       toast.success(
  "Account Created Successfully 🎉"
);

        navigate("/login");

      } catch (error) {

        toast.error(
          error.response.data.message
        );

      }

    };

  return (

    <div className="auth-container">

      <form
        className="auth-box"
        onSubmit={handleRegister}
      >

        <h1>Register</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Register
        </button>

      </form>

    </div>

  );

}

export default Register;