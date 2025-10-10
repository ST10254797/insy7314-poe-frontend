import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [IDNumber, setIDNumber] = useState("");
  const [AccNumber, setAccNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const regexName = /^[a-zA-Z\s]+$/;
  const regexID = /^\d{13}$/;
  const regexAcc = /^\d{8,12}$/;
  const regexUser = /^[a-zA-Z0-9_]{4,20}$/;
  const regexPass = /^[A-Za-z0-9!@#$%^&*]{8,12}$/;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName || !IDNumber || !AccNumber || !userName || !password) {
      return setError("⚠️ All fields are required.");
    }

    if (!regexName.test(fullName)) return setError("Invalid name format.");
    if (!regexID.test(IDNumber)) return setError("ID Number must be exactly 13 digits.");
    if (!regexAcc.test(AccNumber)) return setError("Account Number must be 8–12 digits.");
    if (!regexUser.test(userName)) return setError("Username must be 4–20 characters (letters, numbers, or _).");
    if (!regexPass.test(password)) return setError("Password must be 8–12 characters and can include !@#$%^&*.");

    try {
      const res = await registerUser({ fullName, IDNumber, AccNumber, userName, password });
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Create Account</h1>
        <p>Please fill in your details to register.</p>

        {error && <p className="error-text">{error}</p>}

        <form className="register-form" onSubmit={handleRegister} autoComplete="off">
          <input
            placeholder="Full Name"
            name="fullName"
            autoComplete="new-name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            placeholder="ID Number"
            name="IDNumber"
            autoComplete="off"
            value={IDNumber}
            onChange={(e) => setIDNumber(e.target.value)}
          />

          <input
            placeholder="Account Number"
            name="AccNumber"
            autoComplete="off"
            value={AccNumber}
            onChange={(e) => setAccNumber(e.target.value)}
          />

          <input
            placeholder="Username"
            name="userName"
            autoComplete="new-username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
