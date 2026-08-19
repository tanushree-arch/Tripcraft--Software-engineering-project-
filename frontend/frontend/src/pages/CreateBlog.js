import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

function CreateBlog() {

  const [form, setForm] = useState({
    title: "",
    content: "",
    media: "",
    rating: 0
  });

  const [posts, setPosts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("blogs")) || [];
    setPosts(saved);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRating = (num) => {
    setForm({ ...form, rating: num });
  };

  const handlePost = () => {
    if (!form.title || !form.content) {
      alert("Fill all fields ❌");
      return;
    }

    let updated;

    if (editIndex !== null) {
      updated = [...posts];
      updated[editIndex] = form;
      setEditIndex(null);
    } else {
      updated = [form, ...posts];
    }

    setPosts(updated);
    localStorage.setItem("blogs", JSON.stringify(updated));

    setForm({ title: "", content: "", media: "", rating: 0 });
  };

  const handleDelete = (index) => {
    const updated = posts.filter((_, i) => i !== index);
    setPosts(updated);
    localStorage.setItem("blogs", JSON.stringify(updated));
  };

  const handleEdit = (index) => {
    setForm(posts[index]);
    setEditIndex(index);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{
        flex: 1,
        minHeight: "100vh",
        background: "#fff0f5",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>

        <h1 style={{ color: "#d63384" }}>
          Share Your Travel Story ✨
        </h1>

        {/* 🌸 3 IMAGE BANNER (NO GAP) */}
        <div style={{
          display: "flex",
          marginTop: "20px",
          width: "80%",
          maxWidth: "900px",
          overflow: "hidden",
          borderRadius: "15px"
        }}>

          <img
            src="/createblog.jpg"
            alt="1"
            style={imgStyle}
          />

          <img
            src="/createblog2.jpg"
            alt="2"
            style={imgStyle}
          />

          <img
            src="/createblog3.jpg"
            alt="3"
            style={imgStyle}
          />

        </div>

        {/* FORM */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "15px",
          marginTop: "20px",
          width: "100%",
          maxWidth: "600px",
          boxShadow: "0 4px 15px rgba(255,105,135,0.2)"
        }}>

          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            style={inputStyle}
          />

          <textarea
            name="content"
            placeholder="Write your experience..."
            value={form.content}
            onChange={handleChange}
            style={{ ...inputStyle, height: "100px" }}
          />

          <input
            name="media"
            placeholder="Image/Video URL (optional)"
            value={form.media}
            onChange={handleChange}
            style={inputStyle}
          />

          {/* ⭐ STAR RATING */}
          <div style={{ margin: "10px 0" }}>
            {[1,2,3,4,5].map((num) => (
              <span
                key={num}
                onClick={() => handleRating(num)}
                style={{
                  fontSize: "24px",
                  cursor: "pointer",
                  color: num <= form.rating ? "#ff4d88" : "#ccc"
                }}
              >
                ★
              </span>
            ))}
          </div>

          <button onClick={handlePost} style={btnStyle}>
            {editIndex !== null ? "Update ✏️" : "Post 🚀"}
          </button>
        </div>

        {/* POSTS */}
        <div style={{
          marginTop: "40px",
          width: "100%",
          maxWidth: "600px"
        }}>
          {posts.map((post, index) => (
            <div key={index} style={{
              background: "white",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "20px",
              boxShadow: "0 4px 15px rgba(255,105,135,0.2)"
            }}>

              <h3 style={{ color: "#ff4d88" }}>{post.title}</h3>

              <div>
                {[1,2,3,4,5].map((n) => (
                  <span key={n} style={{
                    color: n <= post.rating ? "#ff4d88" : "#ccc"
                  }}>
                    ★
                  </span>
                ))}
              </div>

              <p>{post.content}</p>

              {post.media && (
                <img
                  src={post.media}
                  alt="media"
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    borderRadius: "10px"
                  }}
                />
              )}

              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <button onClick={() => handleEdit(index)} style={btnStyle}>
                  Edit ✏️
                </button>

                <button onClick={() => handleDelete(index)} style={btnStyle}>
                  Delete ❌
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const imgStyle = {
  width: "33.33%",
  height: "180px",
  objectFit: "cover"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "6px",
  border: "1px solid #ddd"
};

const btnStyle = {
  padding: "8px 12px",
  background: "#ff4d88",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default CreateBlog;