import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

function Saved() {
  const [trips, setTrips] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("trips")) || [];
    setTrips(saved);
  }, []);

  const handleDelete = (index) => {
    const updated = [...trips];
    updated.splice(index, 1);
    setTrips(updated);
    localStorage.setItem("trips", JSON.stringify(updated));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditText(trips[index].itinerary);
  };

  const handleSaveEdit = (index) => {
    const updated = [...trips];
    updated[index].itinerary = editText;

    setTrips(updated);
    localStorage.setItem("trips", JSON.stringify(updated));

    setEditingIndex(null);
    setEditText("");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      {/* 🌿 BACKGROUND */}
      <div
        style={{
          flex: 1,
          minHeight: "100vh",
          backgroundImage:
          "url('https://images.unsplash.com/photo-1473773508845-188df298d2d1')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px"
        }}
      >

        {/* 🌸 OVERLAY */}
        <div style={overlay}>

          <h1 style={{ color: "#d63384" }}>Saved Trips 💖</h1>

          <div style={grid}>

            {trips.length === 0 && (
              <p style={{ color: "#d63384" }}>No saved trips yet 😢</p>
            )}

            {trips.map((trip, index) => (
              <div
                key={index}
                style={cardStyle}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >

                <h3 style={{ color: "#ff4d88" }}>
                  {trip.destination || "Trip"} ({trip.days} days)
                </h3>

                <p style={{ fontSize: "14px" }}>
                  Budget: ₹{trip.budget} | Travellers: {trip.travellers}
                </p>

                {editingIndex === index ? (
                  <>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={textareaStyle}
                    />

                    <button
                      onClick={() => handleSaveEdit(index)}
                      style={btnStyle}
                    >
                      Save ✔
                    </button>
                  </>
                ) : (
                  <>
                    <div style={itineraryStyle}>
                      {trip.itinerary
                        ?.replace(/\*\*/g, "")
                        .replace(/\\n/g, "\n")}
                    </div>

                    <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                      <button
                        onClick={() => handleEdit(index)}
                        style={btnStyle}
                      >
                        Edit ✏️
                      </button>

                      <button
                        onClick={() => handleDelete(index)}
                        style={btnStyle}
                      >
                        Delete ❌
                      </button>
                    </div>
                  </>
                )}

              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

// 🌸 STYLES
const overlay = {
  background: "rgba(255, 240, 245, 0.9)", // soft pink overlay
  minHeight: "100vh",
  padding: "20px",
  borderRadius: "15px"
};

const grid = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  marginTop: "20px"
};

const cardStyle = {
  width: "320px",
  background: "white",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  transition: "0.3s"
};

const textareaStyle = {
  width: "100%",
  height: "120px",
  marginTop: "10px",
  borderRadius: "6px",
  padding: "10px",
  border: "1px solid #ddd"
};

const itineraryStyle = {
  maxHeight: "150px",
  overflowY: "auto",
  fontSize: "13px",
  marginTop: "10px",
  whiteSpace: "pre-wrap"
};

const btnStyle = {
  padding: "8px 12px",
  background: "#ff4d88",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default Saved;