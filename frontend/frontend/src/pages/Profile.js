import Sidebar from "../components/Sidebar";
import { useState } from "react";

function Profile() {
  const [user, setUser] = useState({
    name: "Tanu",
    email: "tanu@email.com",
    bio: "Travel lover ✈️ Exploring the world 💖",
    age: "",
    gender: "",
    image: ""
  });

  const [editing, setEditing] = useState(false);

  // Travel lists
  const [toVisit, setToVisit] = useState([]);
  const [visited, setVisited] = useState([]);
  const [input, setInput] = useState("");

  const [essentials, setEssentials] = useState({
    Passport: false,
    Tickets: false,
    Clothes: false,
    Charger: false,
    Medicine: false
  });

  // 📁 Upload from gallery
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);

      setUser({
        ...user,
        image: url
      });
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setEditing(false);
  };

  const addToVisit = () => {
    if (!input.trim()) return;

    setToVisit([
      ...toVisit,
      input.trim()
    ]);

    setInput("");
  };

  const addVisited = () => {
    if (!input.trim()) return;

    setVisited([
      ...visited,
      input.trim()
    ]);

    setInput("");
  };

  const toggleEssential = (item) => {
    setEssentials({
      ...essentials,
      [item]: !essentials[item]
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          minHeight: "100vh",
          background: "#fff0f5",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h1 style={{ color: "#d63384" }}>
          My Profile 👤
        </h1>

        {/* 🌸 ROSE BANNERS */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            width: "80%",
            maxWidth: "900px",
            marginTop: "20px"
          }}
        >
          <img
            src="profile1.jpg"
            alt="Rose banner"
            style={bannerImg}
          />

          <img
            src="profile2.jpg"
            alt="Rose banner"
            style={bannerImg}
          />

          <img
            src="profile3.jpg"
            alt="Rose banner"
            style={bannerImg}
          />
        </div>

        {/* PROFILE CARD */}
        <div style={cardStyle}>
          <img
            src={
              user.image ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
            style={profileImg}
          />

          {editing ? (
            <>
              <input
                type="file"
                onChange={handleImageUpload}
              />

              <input
                name="name"
                value={user.name}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Name"
              />

              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Email"
              />

              <input
                name="age"
                placeholder="Age"
                value={user.age}
                onChange={handleChange}
                style={inputStyle}
              />

              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>

              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  height: "80px"
                }}
                placeholder="Bio"
              />

              <button
                onClick={handleSave}
                style={btnStyle}
              >
                Save 💾
              </button>
            </>
          ) : (
            <>
              <h2>{user.name}</h2>

              <p>{user.email}</p>

              <p>
                Age: {user.age || "-"}
              </p>

              <p>
                Gender: {user.gender || "-"}
              </p>

              <p>
                {user.bio}
              </p>

              <button
                onClick={() => setEditing(true)}
                style={btnStyle}
              >
                Edit Profile ✏️
              </button>
            </>
          )}
        </div>

        {/* ✈️ TRAVEL LISTS */}
        <div
          style={{
            width: "80%",
            marginTop: "30px"
          }}
        >
          <h2 style={{ color: "#d63384" }}>
            Travel Planner ✨
          </h2>

          <input
            placeholder="Add place..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={inputStyle}
          />

          <div
            style={{
              display: "flex",
              gap: "10px"
            }}
          >
            <button
              onClick={addToVisit}
              style={btnStyle}
            >
              To Visit ✈️
            </button>

            <button
              onClick={addVisited}
              style={btnStyle}
            >
              Visited ✅
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px"
            }}
          >
            {/* TO VISIT */}
            <div style={listBox}>
              <h3>To Visit ✈️</h3>

              {toVisit.length === 0 ? (
                <p>No places added yet.</p>
              ) : (
                toVisit.map((item, i) => (
                  <p key={i}>
                    • {item}
                  </p>
                ))
              )}
            </div>

            {/* VISITED */}
            <div style={listBox}>
              <h3>Visited ✅</h3>

              {visited.length === 0 ? (
                <p>No places added yet.</p>
              ) : (
                visited.map((item, i) => (
                  <p key={i}>
                    • {item}
                  </p>
                ))
              )}
            </div>

            {/* ESSENTIALS */}
            <div style={listBox}>
              <h3>Essentials 🎒</h3>

              {Object.keys(essentials).map((item) => (
                <div key={item}>
                  <input
                    type="checkbox"
                    checked={essentials[item]}
                    onChange={() => toggleEssential(item)}
                  />
                  {" "}
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// STYLES
// ============================================================

const bannerImg = {
  width: "33.3%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "10px"
};

const profileImg = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  objectFit: "cover"
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "15px",
  width: "100%",
  maxWidth: "500px",
  marginTop: "20px",
  textAlign: "center",
  boxShadow: "0 4px 15px rgba(255,105,135,0.2)"
};

const listBox = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  width: "30%"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "6px",
  border: "1px solid #ddd",
  boxSizing: "border-box"
};

const btnStyle = {
  padding: "8px 12px",
  background: "#ff4d88",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default Profile;