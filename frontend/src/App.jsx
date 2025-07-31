// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';

import Welcome from './pages/Welcome.jsx';
import Register from './pages/Register.jsx';
import Activate from './pages/Activate';
import Login from './pages/Login.jsx';
import AdminDashboard from './pages/AdminDashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';

function AppContent() {
  const location = useLocation();
  const isWelcomePage = location.pathname === '/';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: isWelcomePage ? 'url(/src/assets/welcomeBG.jpg)' : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: isWelcomePage ? 'blur(0px) brightness(1)' : 'none',
      }}
    >
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate" element={<Activate />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppContent />
    </Router>
  );
}

export default App;
