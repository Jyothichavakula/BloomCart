import { useState } from "react";
import { toast }
from "react-toastify";
import axios from "axios";



import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success(
  "Login Successful 🎉"
);

      navigate("/");

      window.location.reload();

    } catch (error) {

      alert(
        error.response.data.message
      );

    }

  };

  return (

  <div className="login-page">

    <div className="login-card">

      <h1>Login</h1>

      <p className="signup-text">

        Don't have an account yet?

        <span
          onClick={() =>
            navigate("/register")
          }
        >
          Create account
        </span>

      </p>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

       

        <button type="submit">

          SIGN IN

        </button>

      </form>

      <p
        className="return-store"
        onClick={() =>
          navigate("/")
        }
      >

        Return to Store

      </p>

    </div>

  </div>

);

}

export default Login;