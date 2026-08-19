import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Generate from "./pages/Generate";
import Saved from "./pages/Saved";
import Blog from "./pages/Blog";
import CreateBlog from "./pages/CreateBlog";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>

        {/* Open TripCraft directly */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Main pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/profile" element={<Profile />} />

        {/* Unknown URLs go back to Home */}
        <Route path="*" element={<Navigate to="/home" replace />} />

      </Routes>
    </Router>
  );
}

export default App;