import {
  Box,
  Typography,
  Container,
  Paper,
  Toolbar,
  Button,
  IconButton,
  AppBar,
} from '@mui/material';
import { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AdminSidebar from '../components/AdminSidebar';
import bgImage from '../assets/welcomeBG.jpg';

function AdminDashboard() {
  const [view, setView] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    // Ambil nama admin dari localStorage
    const storedName = localStorage.getItem('adminName');
    if (storedName) setAdminName(storedName);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar transparan & toggle */}
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        setView={setView}
      />

      {/* AppBar transparan */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setSidebarOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" color="white">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          p: 0,
          pt: 8, // untuk ruang AppBar
          position: 'relative',
        }}
      >
        {/* Background blur image */}
        {view === 'home' && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0,
              filter: 'blur(5px)',
            }}
          />
        )}

        {/* Konten atas background */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            p: 3,
          }}
        >
          {view === 'home' && (
            <Container maxWidth="md">
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(20px)',
                  color: '#fff',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h4" gutterBottom fontWeight="bold">
                  Selamat Datang, {adminName || 'Admin'}!
                </Typography>
                <Typography variant="body1" mt={2}>
                  Gunakan dashboard ini untuk mengelola akun dan data dengan bijak.
                  Jaga keamanan dan integritas sistem Anda.
                </Typography>
                <Button
                  sx={{ mt: 3 }}
                  variant="contained"
                  color="primary"
                  onClick={() => setView('manage-admin')}
                >
                  Kelola Admin
                </Button>
              </Paper>
            </Container>
          )}

          {view === 'manage-admin' && (
            <Container maxWidth="md">
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Kelola Admin
              </Typography>
              {/* Di sini bisa taruh komponen daftar admin & tambah admin */}
            </Container>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default AdminDashboard;
