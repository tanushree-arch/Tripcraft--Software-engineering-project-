import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/signup", form);
      alert("Signup successful ✅");

      // 👉 Redirect to login
      navigate("/");

    } catch (err) {
      alert("User already exists ❌");
    }
  };

  return (
    <div style={container}>
      <h2>Signup 💖</h2>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        style={input}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        style={input}
      />

      <button onClick={handleSignup} style={btn}>
        Signup
      </button>
    </div>
  );
}

const container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "100px"
};

const input = {
  margin: "10px",
  padding: "10px",
  width: "250px"
};

const btn = {
  padding: "10px",
  background: "#ff4d88",
  color: "white",
  border: "none",
  borderRadius: "6px"
};

export default Signup;