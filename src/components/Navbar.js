import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ cartItemCount }) => {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage items
    navigate("/login"); // Redirect to login
  };

  // Get user role and email from local storage
  const userRole = localStorage.getItem("role");

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>
          <Link to="/" className="navbar-link">
            Handloom Fashion
          </Link>
        </h1>
      </div>
      <ul className="navbar-links">
        {/* Common Links */}
        <li>
          <Link to="/" className="navbar-link">
            <b>Home</b>
          </Link>
        </li>

        {/* Conditional Links Based on Role */}
        {userRole === "USER" && (
          <>
            <li>
              <Link to="/products" className="navbar-link">
                <b>Products</b>
              </Link>
            </li>
            <li>
              <Link to="/cart" className="navbar-link">
                <b>Cart ({cartItemCount || 0})</b>
              </Link>
            </li>
            <li>
              <button
                className="navbar-button"
                onClick={() => navigate("/dashboard/user")}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className="navbar-button"
                onClick={() => navigate("/profile/update")}
              >
                Update Profile
              </button>
            </li>
          </>
        )}
        {userRole === "ARTISAN" && (
          <>
            <li>
              <Link to="/dashboard/artisan" className="navbar-link">
                <b>Artisan Dashboard</b>
              </Link>
            </li>
            <li>
              <button
                className="navbar-button"
                onClick={() => navigate("/artisan/profile/update")}
              >
                Update Profile
              </button>
            </li>
          </>
        )}
        {userRole === "ADMIN" && (
          <>
            <li>
              <Link to="/dashboard/admin" className="navbar-link">
                <b>Admin Dashboard</b>
              </Link>
            </li>
          </>
        )}

        {/* Auth Links */}
        {!userRole && (
          <>
            <li>
              <Link to="/login" className="navbar-link">
                <b>Login</b>
              </Link>
            </li>
            <li>
              <Link to="/signup" className="navbar-link">
                <b>Signup</b>
              </Link>
            </li>
          </>
        )}

        {/* Logout Button for Authenticated Users */}
        {userRole && (
          <li>
            <button onClick={handleLogout} className="navbar-logout">
              <b>Logout</b>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;