import Sidebar from "../components/Sidebar";

function Explore() {

  const destinations = [

    // 🇮🇳 INDIA (15)
    { name: "Goa", img: "/goa.jpg" },
    { name: "Jaipur", img: "/jaipur.jpg" },
    { name: "Manali", img: "/manali.jpg" },
    { name: "Kerala", img: "/kerala.jpg" },
    { name: "Delhi", img: "/delhi.jpg" },

    { name: "Mumbai", img: "/mumbai.jpg" },
    { name: "Shimla", img: "/shimla.jpg" },
    { name: "Ladakh", img: "/ladakh.jpg" },
    { name: "Varanasi", img: "/varanasi.jpg" },
    { name: "Udaipur", img: "/udaipur.jpg" },

    { name: "Rishikesh", img: "/rishikesh.jpg" },
    { name: "Darjeeling", img: "/darjeeling.jpg" },
    { name: "Andaman", img: "/andaman.jpg" },
    { name: "Mysore", img: "/mysore.jpg" },
    { name: "Amritsar", img: "/amritsar.jpg" },

    // 🌍 INTERNATIONAL (15)
    { name: "Paris", img: "/paris2.jpg" },
    { name: "Dubai", img: "/dubai.jpg" },
    { name: "Greece", img: "/greek.jpg" },
    { name: "Singapore", img: "/singapore.jpg" },
    { name: "London", img: "/london.jpg" },

    { name: "New York", img: "/newyork.jpg" },
    { name: "Tokyo", img: "/tokyo.jpg" },
    { name: "South Korea", img: "/seoul.jpg" },
    { name: "Rome", img: "/rome.jpg" },
    { name: "France", img: "/france.jpg" },

    { name: "Istanbul", img: "/isntanbul.jpg" },
    { name: "Bangkok", img: "/bangkok.jpg" },
    { name: "Sydney", img: "/sydney.jpg" },
    { name: "Cape Town", img: "/capetown.jpg" },
    { name: "Russia", img: "/russia.jpg" }
  ];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      {/* MAIN */}
      <div style={{
        flex: 1,
        minHeight: "100vh",
        background: "#fff0f5",
        padding: "40px"
      }}>

        <h1 style={{
          color: "#d63384",
          textAlign: "center",
          fontSize: "32px"
        }}>
          Explore Destinations 🌍
        </h1>

        {/* GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "20px",
          marginTop: "40px"
        }}>

          {destinations.map((dest, index) => (
            <div
              key={index}
              style={{
                borderRadius: "15px",
                overflow: "hidden",
                background: "white",
                boxShadow: "0 4px 15px rgba(255,105,135,0.2)",
                transition: "0.3s",
                cursor: "pointer"
              }}

              // 🔥 CLICK → OPEN GOOGLE MAPS
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${dest.name}`,
                  "_blank"
                )
              }

              onMouseEnter={(e) =>
                e.currentTarget.style.transform = "scale(1.05)"
              }
              onMouseLeave={(e) =>
                e.currentTarget.style.transform = "scale(1)"
              }
            >

              <img
                src={dest.img}
                alt={dest.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover"
                }}
              />

              <div style={{
                padding: "10px",
                textAlign: "center"
              }}>
                <h3 style={{ color: "#ff4d88" }}>
                  {dest.name}
                </h3>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Explore;