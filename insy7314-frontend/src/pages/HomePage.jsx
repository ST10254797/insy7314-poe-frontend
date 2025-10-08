import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <div className="home-container">
        <div className="home-card">
          <h1>Welcome to Electro Bank</h1>
          <p className="subtitle">Secure and modern banking at your fingertips</p>
          <div className="features">
            <div className="feature">
              <h3>Secure Transactions</h3>
              <p>All your payments are protected with bank-level security.</p>
            </div>
            <div className="feature">
              <h3>Fast Transfers</h3>
              <p>Send money internationally in seconds.</p>
            </div>
            <div className="feature">
              <h3>24/7 Support</h3>
              <p>We’re here to help anytime you need assistance.</p>
            </div>
          </div>
          <div className="home-buttons">
            <Link to="/login" className="btn primary">Get Started</Link>
            <Link to="/about" className="btn secondary">Learn More</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
