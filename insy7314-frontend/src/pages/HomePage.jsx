// HomePage.jsx
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1>International Bank</h1>
        <p className="subtitle">Secure and modern banking at your fingertips</p>
        <div className="buttons">
          <Link to="/login" className="btn primary">Login</Link>
          <Link to="/register" className="btn secondary">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
