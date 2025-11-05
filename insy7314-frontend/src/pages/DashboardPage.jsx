// src/pages/DashboardPage.jsx
import { Link, useNavigate } from "react-router-dom";
import "../pages/Dashboard.css";

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <div className="dashboard-content">
        <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
        <p className="dashboard-subtitle">Select an action below:</p>

        {/* Payment Info Section */}
        <div className="payment-info">
          <h2>International Payments</h2>
          <p>
            Use this feature to send payments to anyone worldwide. Secure, fast,
            and reliable transfers directly from your account.
          </p>
        </div>

        <div className="dashboard-actions">
          <Link to="/payments" className="dashboard-btn">💳 Make a Payment</Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
