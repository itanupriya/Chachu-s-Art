import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Gallery from "./pages/Gallery.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={isLoggedIn ? <AdminDashboard /> : <AdminLogin />}
        />
      </Routes>
    </>
  );
}

export default App;
