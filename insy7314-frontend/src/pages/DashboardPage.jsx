// src/pages/DashboardPage.jsx
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../pages/Dashboard.css";

function DashboardPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [transactions, setTransactions] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });

  // Fetch user's transactions
  const fetchTransactions = async () => {
    try {
      const res = await axios.get("https://localhost:4000/api/user/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching transactions:", err.response?.data || err.message);
      setToast({
        message: err.response?.data?.message || "Failed to fetch transactions",
        type: "error",
      });
      setTransactions([]);
    }
  };

  useEffect(() => {
    if (token) fetchTransactions();
    else setToast({ message: "No token found. Please login.", type: "error" });
  }, [token]);

  // Auto-hide toast
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ message: "", type: "" }), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

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
            Use this feature to send payments worldwide. Secure, fast,
            and reliable transfers directly from your account.
          </p>
        </div>

        <div className="dashboard-actions">
          <button className="dashboard-btn" onClick={() => navigate("/payments")}>
            💳 Make a Payment
          </button>
        </div>

        {/* Transactions Table */}
        {toast.message && <div className={`toast ${toast.type}`}>{toast.message}</div>}

        <div className="table-card" style={{ marginTop: "30px" }}>
          <h2 style={{ color: "#4a90e2", marginBottom: "15px" }}>Your Transactions</h2>
          <table className="transaction-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Provider</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t._id}>
                    <td>{t._id}</td>
                    <td>{t.amount}</td>
                    <td>{t.currency}</td>
                    <td>{t.provider}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          t.status === "Pending"
                            ? "pending"
                            : t.status === "Verified"
                            ? "verified"
                            : "submitted"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
