// AdminDashboard.jsx
import {
    Box, Typography, Container, Paper, Toolbar, Button, IconButton, AppBar,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import MenuIcon from '@mui/icons-material/Menu';
import AdminSidebar from '../components/AdminSidebar';
import bgImage from '../assets/welcomeBG.jpg';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

// Varian animasi untuk transisi halaman
const pageTransitionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
};

function AdminDashboard() {
    const [view, setView] = useState('home');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [adminName, setAdminName] = useState('');

    useEffect(() => {
        const storedName = localStorage.getItem('adminName');
        if (storedName) setAdminName(storedName);
    }, []);

    const renderContent = () => {
        // Kunci untuk AnimatePresence adalah 'key'. Kita gunakan 'view' sebagai key.
        switch (view) {
            case 'home':
                return (
                    <motion.div key="home" {...pageTransitionVariants}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: { xs: 3, sm: 5 }, borderRadius: 4,
                                backgroundColor: 'rgba(17, 24, 39, 0.75)', backdropFilter: 'blur(16px)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                                color: '#F9FAFB', textAlign: 'center',
                            }}
                        >
                            <Typography variant="h4" gutterBottom fontWeight="700">
                                Selamat Datang, {adminName || 'Guru'}!
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#D1D5DB', maxWidth: 500, mx: 'auto' }}>
                                Anda login sebagai guru. Gunakan portal ini untuk mengelola aktivitas akademik.
                            </Typography>
                            <Button
                                startIcon={<ManageAccountsIcon />}
                                onClick={() => setView('profile')}
                                variant="contained"
                                sx={{
                                    mt: 4, px: 4, py: 1.5, fontWeight: 600, borderRadius: '999px',
                                    textTransform: 'uppercase', letterSpacing: '1px',
                                    background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                                    boxShadow: '0 8px 20px rgba(25,118,210,0.25)',
                                    transition: 'transform 250ms ease, box-shadow 250ms ease',
                                    '&:hover': { transform: 'scale(1.05)', boxShadow: '0 12px 28px rgba(25,118,210,0.35)' },
                                }}
                            >
                                Lihat Profil
                            </Button>
                        </Paper>
                    </motion.div>
                );
            case 'profile':
                return (
                    <motion.div key="profile" {...pageTransitionVariants}>
                        <Paper sx={{ p: 4, borderRadius: 3 }}>
                            <Typography variant="h5" fontWeight="bold">Profil Saya</Typography>
                            <Typography>Di sini akan ada form untuk mengedit nama, email, dan password guru.</Typography>
                        </Paper>
                    </motion.div>
                );
            case 'manage-students':
                return (
                    <motion.div key="manage-students" {...pageTransitionVariants}>
                        <Paper sx={{ p: 4, borderRadius: 3 }}>
                            <Typography variant="h5" fontWeight="bold">Kelola Siswa</Typography>
                            <Typography>Tabel data siswa, tombol tambah, edit, dan hapus akan muncul di sini.</Typography>
                        </Paper>
                    </motion.div>
                );
            default:
                return (
                    <motion.div key="default" {...pageTransitionVariants}>
                        <Paper sx={{ p: 4, borderRadius: 3 }}>
                            <Typography variant="h5">Halaman Belum Tersedia</Typography>
                        </Paper>
                    </motion.div>
                );
        }
    };

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#020617' }}>
            <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} setView={setView} />
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(17, 24, 39, 0.7)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                }}
            >
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => setSidebarOpen(true)} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" fontWeight="bold" color="white">Dashboard Guru</Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                    flexGrow: 1, minHeight: '100vh', p: 0, position: 'relative',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
            >
                <Box sx={{
                    position: 'absolute', inset: 0, backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0,
                    filter: 'brightness(0.5)', transition: 'filter 0.3s ease-in-out',
                    ...(view === 'home' && { filter: 'brightness(0.5) blur(5px)' }),
                }}
                />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: '64px' }}>
                    {/* AnimatePresence untuk transisi halaman */}
                    <AnimatePresence mode="wait">
                        {renderContent()}
                    </AnimatePresence>
                </Container>
            </Box>
        </Box>
    );
}

export default AdminDashboard;