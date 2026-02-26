import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import NavBar from './NavBar';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import Dashboard from './Dashboard';
import AdminDashboard from './AdminDashboard';
import HydrationPage from './HydrationPage';
import HealthyFoodPage from './HealthyFoodPage';
import BreathingPage from './BreathingPage';
import YogaPage from './YogaPage';
import WalkingPage from './WalkingPage';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route path="/hydration" element={<ProtectedRoute><HydrationPage /></ProtectedRoute>} />
      <Route path="/healthy-food" element={<ProtectedRoute><HealthyFoodPage /></ProtectedRoute>} />
      <Route path="/breathing" element={<ProtectedRoute><BreathingPage /></ProtectedRoute>} />
      <Route path="/yoga" element={<ProtectedRoute><YogaPage /></ProtectedRoute>} />
      <Route path="/walking" element={<ProtectedRoute><WalkingPage /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
