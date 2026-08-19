import Sidebar from "../components/Sidebar";
import { useState } from "react";
import axios from "axios";

function Generate() {
  const [form, setForm] = useState({
    destination: "",
    days: "",
    budget: "",
    travellers: ""
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/generate-itinerary",
        form
      );
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("API error ❌");
    }
  };

  const handleSave = () => {
    const savedTrips = JSON.parse(localStorage.getItem("trips")) || [];

    savedTrips.push({
      ...form,
      itinerary: result.itinerary
    });

    localStorage.setItem("trips", JSON.stringify(savedTrips));

    alert("Trip Saved Successfully 💖");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      {/* MAIN */}
      <div
        style={{
          flex: 1,
          minHeight: "100vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >

        {/* FORM PANEL */}
        <div
          style={{
            width: "400px",
            padding: "30px",
            background: "rgba(255,255,255,0.9)",
            borderRadius: "15px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
            textAlign: "center"
          }}
        >
          <h2 style={{ color: "#d63384" }}>Plan Your Trip ✨</h2>

          <input name="destination" placeholder="Destination"
            onChange={handleChange} style={inputStyle} />

          <input name="days" placeholder="Days"
            onChange={handleChange} style={inputStyle} />

          <input name="budget" placeholder="Budget"
            onChange={handleChange} style={inputStyle} />

          <input name="travellers" placeholder="Travellers"
            onChange={handleChange} style={inputStyle} />

          <button onClick={handleSubmit} style={buttonStyle}>
            Generate 🚀
          </button>
        </div>

        {/* RESULT PANEL */}
        {result && result.itinerary && (
          <div
            style={{
              marginTop: "30px",
              width: "85%",
              maxWidth: "900px",
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
            }}
          >
            <h2 style={{ color: "#d63384", marginBottom: "20px" }}>
              Your Itinerary ✨
            </h2>

            {result.itinerary
              .replace(/\*\*/g, "")
              .replace(/\\n/g, "\n")
              .split("\n")
              .map((line, index) => {

                const cleanLine = line.trim();
                if (!cleanLine) return null;

                // Day Heading
                if (cleanLine.toLowerCase().includes("day")) {
                  return (
                    <h3 key={index} style={{
                      color: "#ff4d88",
                      marginTop: "25px"
                    }}>
                      {cleanLine}
                    </h3>
                  );
                }

                // Bullet points
                if (cleanLine.startsWith("-")) {
                  return (
                    <div key={index} style={{
                      marginLeft: "15px",
                      marginBottom: "8px"
                    }}>
                      • {cleanLine.replace("-", "").trim()}
                    </div>
                  );
                }

                // Normal text
                return (
                  <p key={index} style={{ marginBottom: "10px" }}>
                    {cleanLine}
                  </p>
                );
              })}

            {/* 🔥 SAVE BUTTON */}
            <button
              onClick={handleSave}
              style={{
                marginTop: "20px",
                padding: "12px 20px",
                background: "#ff4d88",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Save Itinerary 💾
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "6px",
  border: "1px solid #ddd"
};

const buttonStyle = {
  marginTop: "10px",
  width: "100%",
  padding: "12px",
  background: "#ff4d88",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default Generate;