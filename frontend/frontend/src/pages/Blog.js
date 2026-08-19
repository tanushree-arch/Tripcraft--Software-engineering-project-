import Sidebar from "../components/Sidebar";

function Blog() {

  const blogs = [
    {
      title: "A Magical Trip to Goa 🌊",
      desc: "Sunsets, beaches, and unforgettable vibes in Goa.",
      img: "/goa3.jpg",
      link: "https://www.thrillophilia.com/places-to-visit-in-goa"
    },
    {
      title: "Exploring the Royal Jaipur 🏰",
      desc: "A journey through palaces, forts, and rich culture.",
      img: "/jaipur.jpg",
      link: "https://www.holidify.com/places/jaipur/"
    },
    {
      title: "Peaceful Escape to Manali ❄️",
      desc: "Mountains, snow, and calmness like never before.",
      img: "/manali2.jpg",
      link: "https://www.tripadvisor.in/Tourism-g297618-Manali_Kullu_District_Himachal_Pradesh-Vacations.html"
    },
    {
      title: "Backwaters of Kerala 🌴",
      desc: "Relaxing boat rides and serene beauty.",
      img: "/kerala2.jpg",
      link: "https://www.keralatourism.org/"
    },
    {
      title: "Paris — City of Love ❤️",
      desc: "Romantic streets and iconic Eiffel Tower views.",
      img: "/paris3.jpg",
      link: "https://en.parisinfo.com/"
    },
    {
      title: "Dubai Luxury Life ✨",
      desc: "Sky-high buildings and desert adventures.",
      img: "/dubai2.jpg",
      link: "https://www.visitdubai.com/"
    }
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
          Travel Blogs 📝
        </h1>

        {/* BLOG GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "25px",
          marginTop: "40px"
        }}>

          {blogs.map((blog, index) => (
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
              onMouseEnter={(e) =>
                e.currentTarget.style.transform = "scale(1.05)"
              }
              onMouseLeave={(e) =>
                e.currentTarget.style.transform = "scale(1)"
              }
            >

              <img
                src={blog.img}
                alt={blog.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover"
                }}
              />

              <div style={{ padding: "15px" }}>
                <h3 style={{ color: "#ff4d88" }}>
                  {blog.title}
                </h3>

                <p style={{ fontSize: "14px", color: "#555" }}>
                  {blog.desc}
                </p>

                {/* 🔥 CLICKABLE BUTTON */}
                <button
                  onClick={() => window.open(blog.link, "_blank")}
                  style={{
                    marginTop: "10px",
                    padding: "8px 12px",
                    background: "#ff4d88",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Read More →
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Blog;