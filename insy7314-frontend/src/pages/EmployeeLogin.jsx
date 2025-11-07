import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function EmployeeLogin() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const handleLogin = async (e) => {
e.preventDefault();
setError("");
setLoading(true);
console.log("Login button clicked", { email, password });


try {
  const res = await axios.post(
    "https://localhost:4000/api/employee/login",
    { email, password },
    { timeout: 5000 }
  );

  console.log("Response from server:", res.data);

  if (res.data && res.data.token && res.data.role) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role.toLowerCase().trim());
    console.log("Login successful, navigating...");

    if (res.data.role.toLowerCase() === "manager") {
      navigate("/manager-dashboard");
    } else {
      navigate("/employee-dashboard");
    }
  } else {
    console.warn("No token or role received from server");
    setError("Login failed: invalid server response");
  }
} catch (err) {
  console.error("Login error:", err.response || err.message);
  setError(err.response?.data?.message || "Login failed");
} finally {
  setLoading(false);
}


};

return ( <div className="login-container"> <div className="login-card"> <h1>Employee Login</h1>
{error && <p className="error-text">{error}</p>} <form className="login-form" onSubmit={handleLogin}>
<input
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
autoComplete="username"
/>
<input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
autoComplete="current-password"
/> <button type="submit" disabled={loading}>
{loading ? "Logging in..." : "Login"} </button> </form> </div> </div>
);
}
