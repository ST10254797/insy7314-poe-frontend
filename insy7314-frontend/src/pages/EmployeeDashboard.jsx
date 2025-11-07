import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });
  const token = localStorage.getItem("token");

    // --- Define handleLogout inside the component ---
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/HomePage"; // redirect to login page
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const res = await axios.get("https://localhost:4000/api/employee/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Transactions from API:", res.data);
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

  // Handle verify/submit
  const handleAction = async (id, action) => {
    try {
      const res = await axios.put(`https://localhost:4000/api/employee/${action}/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToast({ message: res.data.message, type: "success" });
      fetchTransactions();
    } catch (err) {
      console.error("Action error:", err.response?.data || err.message);
      setToast({
        message: err.response?.data?.message || "Action failed",
        type: "error",
      });
    }
  };

  // Auto-hide toast
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ message: "", type: "" }), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="employee-container">
      <div className="employee-header">
        <h1>Employee Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {toast.message && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}

      <div className="table-card">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sender Name</th>
              <th>Username</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Provider</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No pending or verified transactions
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t._id}>
                  <td>{t._id}</td>
                  <td>{t.sender?.fullName || "Unknown"}</td>
                  <td>{t.sender?.userName || "Unknown"}</td>
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
                  <td className="actions">
                    <button
                      onClick={() => handleAction(t._id, "verify")}
                      className="approve-btn"
                      disabled={t.status === "Verified" || t.status === "Submitted to SWIFT"}
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleAction(t._id, "submit")}
                      className="submit-btn"
                      disabled={t.status === "Submitted to SWIFT"}
                    >
                      Submit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
