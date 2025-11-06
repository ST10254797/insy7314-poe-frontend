import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PaymentsPage from "./pages/PaymentsPage";
import DashboardPage from "./pages/DashboardPage";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeLogin from "./pages/EmployeeLogin";
import AboutUs from "./pages/AboutUs";
import Privacy from "./pages/Privacy";

// Check if a user is logged in (any user)
function isValidToken() {
const token = localStorage.getItem("token");
if (!token) return false;

try {
const payload = JSON.parse(atob(token.split(".")[1]));
return payload.exp * 1000 > Date.now();
} catch (error) {
return false;
}
}

// Check if logged-in user is an employee
function isEmployee() {
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
if (!token || role !== "employee") return false;

try {
const payload = JSON.parse(atob(token.split(".")[1]));
return payload.exp * 1000 > Date.now();
} catch {
return false;
}
}

function App() {
const isLoggedIn = isValidToken();
const isEmployeeLoggedIn = isEmployee();

return ( <div data-testid="app"> <BrowserRouter> <Routes>
{/* Public routes */}
<Route path="/" element={<HomePage />} />
<Route path="/about" element={<AboutUs />} />
<Route path="/privacy" element={<Privacy />} />
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />

```
      {/* Customer protected routes */}
      <Route
        path="/dashboard"
        element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/payments"
        element={isLoggedIn ? <PaymentsPage /> : <Navigate to="/login" replace />}
      />

      {/* Employee login */}
      <Route path="/employee-login" element={<EmployeeLogin />} />

      {/* Employee protected routes */}
      <Route
        path="/employee-dashboard"
        element={
          isEmployeeLoggedIn
            ? <EmployeeDashboard />
            : <Navigate to="/employee-login" replace />
        }
      />

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
</div>

);
}

export default App;
