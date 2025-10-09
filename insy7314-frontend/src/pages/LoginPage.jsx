import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [userName, setUserName] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Match backend regex exactly
  const regexUser = /^[a-zA-Z0-9_]{4,20}$/;
  const regexAcc = /^\d{8,12}$/;
  const regexPass = /^[A-Za-z0-9!@#$%^&*]{8,12}$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Frontend whitelist validation (same as backend)
    if (!regexUser.test(userName)) {
      return setError("Username must be 4–20 characters (letters, numbers, underscore).");
    }
    if (!regexAcc.test(accNumber)) {
      return setError("Account number must be 8–12 digits only.");
    }
    if (!regexPass.test(password)) {
      return setError("Password must be 8–12 valid characters (!@#$%^&*).");
    }

    try {
      const res = await axios.post("https://localhost:4000/api/auth/login", {
        userName,
        AccNumber: accNumber,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response || err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Account Number"
          value={accNumber}
          onChange={(e) => setAccNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
