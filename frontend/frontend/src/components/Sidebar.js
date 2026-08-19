import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const itemStyle = {
    cursor: "pointer",
    margin: "15px 0",
    padding: "10px 12px",
    borderRadius: "8px",
    transition: "0.2s",
    fontSize: "15px"
  };

  const hoverEffect = (e, color) => {
    e.target.style.background = color;
  };

  const removeHover = (e) => {
    e.target.style.background = "transparent";
  };

  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "linear-gradient(180deg, #ff85a2, #ff4d88)",
      color: "white",
      padding: "20px",
      boxShadow: "2px 0 10px rgba(0,0,0,0.1)"
    }}>

      <h2 style={{ marginBottom: "30px" }}>TripCraft</h2>

      <p style={itemStyle}
        onClick={() => navigate("/home")}
        onMouseEnter={(e) => hoverEffect(e, "#ff6f9f")}
        onMouseLeave={removeHover}>
        🏠 Home
      </p>

      <p style={itemStyle}
        onClick={() => navigate("/explore")}
        onMouseEnter={(e) => hoverEffect(e, "#ff6f9f")}
        onMouseLeave={removeHover}>
        🌍 Explore
      </p>

      <p style={itemStyle}
        onClick={() => navigate("/generate")}
        onMouseEnter={(e) => hoverEffect(e, "#ff6f9f")}
        onMouseLeave={removeHover}>
        ✨ Plan Trip
      </p>

      <p style={itemStyle}
        onClick={() => navigate("/saved")}
        onMouseEnter={(e) => hoverEffect(e, "#ff6f9f")}
        onMouseLeave={removeHover}>
        💾 Saved
      </p>

      <p style={itemStyle}
        onClick={() => navigate("/blog")}
        onMouseEnter={(e) => hoverEffect(e, "#ff6f9f")}
        onMouseLeave={removeHover}>
        📝 Blogs
      </p>

      <p style={itemStyle}
        onClick={() => navigate("/create-blog")}
        onMouseEnter={(e) => hoverEffect(e, "#ff6f9f")}
        onMouseLeave={removeHover}>
        ✍️ Create Blog
      </p>

      {/* 👤 NEW PROFILE OPTION */}
      <p style={itemStyle}
        onClick={() => navigate("/profile")}
        onMouseEnter={(e) => hoverEffect(e, "#ff6f9f")}
        onMouseLeave={removeHover}>
        👤 Profile
      </p>

    </div>
  );
}

export default Sidebar;