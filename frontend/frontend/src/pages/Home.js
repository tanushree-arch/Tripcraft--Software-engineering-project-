import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", background: "#fff0f5" }}>

      {/* 🔹 Sidebar */}
      <Sidebar />

      {/* 🔹 Main Content */}
      <div style={{ flex: 1 }}>

        {/* 🔹 Navbar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px 30px",
          background: "#ffe4ec",
          borderBottom: "1px solid #f8cdd8"
        }}>
          <h2 style={{ color: "#d63384" }}>TripCraft</h2>

          <div>
            <button style={{ marginRight: "10px" }}>Log In</button>
            <button style={{
              background: "#ff4d88",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "6px"
            }}>
              Sign Up
            </button>
          </div>
        </div>

        {/* 🔹 HERO */}
        <div style={{
          height: "70vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "white"
        }}>
          <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
            Craft Your Perfect Journey with AI
          </h1>

          <p style={{ marginTop: "10px", fontSize: "18px" }}>
            Plan smarter trips with personalized travel experiences
          </p>

          <button
            onClick={() => navigate("/generate")}
            style={{
              marginTop: "20px",
              background: "#ff4d88",
              padding: "12px 25px",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Start Planning →
          </button>
        </div>

        {/* 🔹 WHY SECTION */}
        <div style={{ padding: "60px 20px", textAlign: "center" }}>
          <h1 style={{ color: "#d63384" }}>Why TripCraft?</h1>

          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap"
          }}>
            {[
              {
                title: "AI-Powered Itineraries",
                desc: "Personalized travel plans using AI"
              },
              {
                title: "Traveller-Tested",
                desc: "Recommendations from real travellers"
              },
              {
                title: "Day-wise Planning",
                desc: "Structured plans with time & cost"
              },
              {
                title: "City Explorer",
                desc: "Discover hidden gems and attractions"
              }
            ].map((item, index) => (
              <div key={index} style={{
                width: "250px",
                padding: "20px",
                borderRadius: "15px",
                background: "white",
                boxShadow: "0 4px 15px rgba(255,105,135,0.2)"
              }}>
                <h3 style={{ color: "#ff4d88" }}>{item.title}</h3>
                <p style={{ color: "gray" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 STORY SECTION */}
        <div style={{
          padding: "40px",
          textAlign: "center",
          background: "#ffe4ec"
        }}>
          <h2>A Journey Beyond Destinations</h2>

          <p style={{ maxWidth: "700px", margin: "20px auto", color: "#555" }}>
            It started with a simple desire — to escape the ordinary. A small decision to step out turned into a journey that changed everything.
          </p>

          <p style={{ maxWidth: "700px", margin: "20px auto", color: "#555" }}>
            Traveling is not just about ticking places off a list. It’s about finding yourself in moments you never planned.
          </p>

          <p style={{ color: "#ff4d88", fontWeight: "bold" }}>
            and they say when sometimes a place desperately calls you, its because your story has already been written there...
          </p>
        </div>

        {/* 🔹 FOOTER (RESTORED) */}
        <div style={{
          marginTop: "40px",
          padding: "60px 20px",
          textAlign: "center",
          background: "linear-gradient(135deg, #f9a8d4, #93c5fd)",
          color: "white",
          borderTopLeftRadius: "40px",
          borderTopRightRadius: "40px"
        }}>
          <p style={{
            fontStyle: "italic",
            fontSize: "18px",
            maxWidth: "700px",
            margin: "0 auto"
          }}>
            "Travel is not just about places, it's about moments that stay with you forever.
            Every journey writes a story — make yours unforgettable. 🌍✨"
          </p>

          <h3 style={{ marginTop: "30px" }}>Made with ❤️ by</h3>

          <div style={{ marginTop: "10px" }}>
            <h4>Tanushree</h4>
            <p>📞 9661803303</p>
            <p>📧 tanushree12101212@gmail.com</p>
          </div>

          <div style={{ marginTop: "10px" }}>
            <h4>Smily Saini</h4>
          </div>

          <p style={{ marginTop: "25px", fontSize: "14px" }}>
            © 2026 TripCraft. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Home;