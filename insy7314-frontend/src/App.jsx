import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PaymentsPage from "./pages/PaymentsPage";
import DashboardPage from "./pages/DashboardPage";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeLogin from "./pages/EmployeeLogin";
import ManagerDashboard from "./pages/ManagerDashboard";
import AboutUs from "./pages/AboutUs";
import Privacy from "./pages/Privacy";

// Helper: Check if a valid token exists
function isValidToken() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
}

// Helper: Get normalized role
function getRole() {
  const role = localStorage.getItem("role");
  return role ? role.toLowerCase().trim() : null;
}

function App() {
  const isLoggedIn = isValidToken();
  const role = getRole();

  return (
    <div data-testid="app">
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Customer protected routes */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn && role === "customer" ? (
                <DashboardPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/payments"
            element={
              isLoggedIn && role === "customer" ? (
                <PaymentsPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Employee login route */}
          <Route path="/employee-login" element={<EmployeeLogin />} />

          {/* Employee protected route */}
          <Route
            path="/employee-dashboard"
            element={
              isLoggedIn && role === "employee" ? (
                <EmployeeDashboard />
              ) : (
                <Navigate to="/employee-login" replace />
              )
            }
          />

          {/* Manager protected route */}
          <Route
            path="/manager-dashboard"
            element={
              isLoggedIn && role === "manager" ? (
                <ManagerDashboard />
              ) : (
                <Navigate to="/employee-login" replace />
              )
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
