// src/pages/DashboardPage.jsx
import { Link, useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    navigate("/login"); // redirect to login page
  };

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <p>Select an action below:</p>
      <ul>
        <li>
          <Link to="/payments">Make a Payment</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default DashboardPage;
