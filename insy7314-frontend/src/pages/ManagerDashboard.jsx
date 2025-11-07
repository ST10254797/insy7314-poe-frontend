import React, { useState, useEffect } from "react";
import "./ManagerDashboard.css";

const ManagerDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token"); // stored after login

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const res = await fetch("https://localhost:4000/api/manager/all-employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setEmployees(data);
      else setMessage(data.message || "Error fetching employees");
    } catch (err) {
      setMessage("Failed to load employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/HomePage"; // redirect to login page
};


  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("https://localhost:4000/api/manager/add-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Employee added successfully!");
        setForm({ name: "", employeeId: "", email: "", password: "", role: "employee" });
        fetchEmployees();
      } else {
        setMessage(data.message || "Failed to add employee");
      }
    } catch (err) {
      setMessage("Server error while adding employee");
    }
  };

  return (
  <div className="manager-dashboard-container">
    <div className="manager-dashboard-header">
      <h1 className="dashboard-title">Manager Dashboard</h1>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>

    <p className="dashboard-subtitle">Manage your employees efficiently</p>

    {message && <div className="toast-message">{message}</div>}

    {/* Add Employee Form */}
    <div className="card add-employee-card">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit} className="employee-form">
        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input type="text" name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
        <button type="submit">Add Employee</button>
      </form>
    </div>

    {/* Employee List */}
    <div className="card employee-list-card">
      <h2>All Employees</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.employeeId}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default ManagerDashboard;
