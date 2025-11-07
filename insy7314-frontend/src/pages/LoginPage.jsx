import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function LoginPage() {
const [userName, setUserName] = useState("");
const [accNumber, setAccNumber] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const regexUser = /^[a-zA-Z0-9_]{4,20}$/;
const regexAcc = /^\d{8,12}$/;
const regexPass = /^[A-Za-z0-9!@#$%^&*]{8,12}$/;

const handleLogin = async (e) => {
e.preventDefault();
setError("");


if (!regexUser.test(userName)) {
  return setError("Username must be 4–20 characters (letters, numbers, underscore).");
}
if (!regexAcc.test(accNumber)) {
  return setError("Account number must be 8–12 digits only.");
}
if (!regexPass.test(password)) {
  return setError("Password must be 8–12 valid characters (!@#$%^&*).");
}

setLoading(true);
try {
  const res = await axios.post("https://localhost:4000/api/auth/login", {
    userName,
    AccNumber: accNumber,
    password,
  });

  // Save token
  localStorage.setItem("token", res.data.token);

  // ✅ Use safe fallback if role is missing
  const role = res.data.role ? res.data.role.toLowerCase() : "customer";
  localStorage.setItem("role", role);

  // Navigate based on role
  if (role === "customer") {
    navigate("/dashboard");
  } else if (role === "employee") {
    navigate("/employee-dashboard");
  } else if (role === "manager") {
    navigate("/manager-dashboard");
  } else {
    setError("Unknown role, cannot navigate");
  }
} catch (err) {
  console.error("Login error:", err.response || err);
  setError(err.response?.data?.message || "Login failed");
} finally {
  setLoading(false);
}


};

return ( <div className="login-container"> <div className="login-card"> <h1>Login Portal</h1> <p>Please login with your credentials</p>

```
    {error && <p className="error-text">{error}</p>}

    <form className="login-form" onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
        autoComplete="username"
      />
      <input
        type="text"
        placeholder="Account Number"
        value={accNumber}
        onChange={(e) => setAccNumber(e.target.value)}
        required
        autoComplete="off"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  </div>
</div>


);
}

export default LoginPage;
