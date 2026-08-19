import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  // 🔐 LOGIN
  const loginUser = async () => {
    if (!email) {
      alert("Enter your email ❌");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:5000/login", {
        email
      });

      // ✅ SAVE LOGIN
      localStorage.setItem("userEmail", email);
      localStorage.setItem("isLoggedIn", "true");

      alert("Login successful 🎉");

      // ✅ REDIRECT TO HOME
      navigate("/home");

    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message || "User not found ❌");
      } else {
        alert("Unable to connect to the server ❌");
      }
    }
  };

  return (
    <div style={container}>
      <h1 style={{ color: "#ff4d88" }}>Welcome Back 💖</h1>

      {/* EMAIL */}
      <input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={input}
      />

      {/* LOGIN BUTTON */}
      <button onClick={loginUser} style={btn}>
        Login 💖
      </button>

      {/* SIGNUP LINK */}
      <p style={{ marginTop: "20px" }}>
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          style={{
            color: "#ff4d88",
            cursor: "pointer"
          }}
        >
          Signup 💖
        </span>
      </p>
    </div>
  );
}

const container = {
  textAlign: "center",
  marginTop: "100px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const input = {
  padding: "10px",
  margin: "10px",
  width: "250px",
  borderRadius: "6px",
  border: "1px solid #ddd"
};

const btn = {
  padding: "10px",
  background: "#ff4d88",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default Login;
