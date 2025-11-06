import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Reuse your login CSS theme

export default function EmployeeLogin() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate();

const handleLogin = async (e) => {
e.preventDefault();
setError("");
console.log("Login button clicked"); // ✅ confirm function fires
console.log("Email:", email, "Password:", password);


try {
  const res = await axios.post(
    "https://localhost:4000/api/employee/login",
    { email, password },
    { timeout: 5000 } // optional: detect if request hangs
  );

  console.log("Response from server:", res.data); // ✅ check what comes back

  if (res.data && res.data.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    console.log("Login successful, navigating...");
    navigate("/employee-dashboard");
  } else {
    console.warn("No token received from server");
    setError("Login failed: no token received");
  }
} catch (err) {
  console.error("Login error:", err.response || err.message);
  setError(err.response?.data?.message || "Login failed");
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
autoComplete="username" // suggested by browser
/>
<input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
autoComplete="current-password"
/> <button type="submit">Login</button> </form> </div> </div>
);
}
