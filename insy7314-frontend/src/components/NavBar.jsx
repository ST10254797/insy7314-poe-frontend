import { Link } from "react-router-dom";
import { FaHome, FaInfoCircle, FaUserShield, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">Electro Bank</div>

        <div className="nav-main-links">
          <Link to="/" className="nav-link"><FaHome style={{ marginRight: "6px" }} />Home</Link>
          <Link to="/about" className="nav-link"><FaInfoCircle style={{ marginRight: "6px" }} />About Us</Link>
          <Link to="/privacy" className="nav-link"><FaUserShield style={{ marginRight: "6px" }} />Privacy</Link>
        </div>

        <div className="nav-auth">
          <Link to="/login" className="btn login-btn"><FaSignInAlt style={{ marginRight: "6px" }} />Login</Link>
          <Link to="/register" className="btn register-btn"><FaUserPlus style={{ marginRight: "6px" }} />Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
