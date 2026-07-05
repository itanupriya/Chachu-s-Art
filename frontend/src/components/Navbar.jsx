import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/admin/login");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
         <h2>🐦‍🔥Chachu's Art</h2>
      </Link>

      <div className="nav-links">
        {isLoggedIn && location.pathname.startsWith("/admin") ? (
          <button onClick={handleLogout} className="link-btn">
            Logout
          </button>
        ) : (
          <Link to="/admin/login">Admin Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
