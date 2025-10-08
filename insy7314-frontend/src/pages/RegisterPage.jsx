import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [IDNumber, setIDNumber] = useState("");
  const [AccNumber, setAccNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({ fullName, IDNumber, AccNumber, userName, password });
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
      <input placeholder="ID Number" value={IDNumber} onChange={e => setIDNumber(e.target.value)} />
      <input placeholder="Account Number" value={AccNumber} onChange={e => setAccNumber(e.target.value)} />
      <input placeholder="Username" value={userName} onChange={e => setUserName(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
}
