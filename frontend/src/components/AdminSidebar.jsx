// src/components/AdminSidebar.jsx
import {
    Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Box, Typography, IconButton, Toolbar, Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const drawerWidth = 260;

const listVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.07,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
};

const AdminSidebar = ({ open, onClose, setView }) => {
    const navigate = useNavigate();

    const menuItems = [
        { text: 'Dashboard', view: 'home', icon: <DashboardIcon /> },
        { text: 'Profil Saya', view: 'profile', icon: <AccountCircleIcon /> },
        { text: 'Kelola Siswa', view: 'manage-students', icon: <PeopleIcon /> },
        { text: 'Kelola Kelas', view: 'manage-classes', icon: <ClassIcon /> },
        { text: 'Input Nilai', view: 'input-grades', icon: <AssignmentIcon /> },
    ];

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/auth/logout', {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            localStorage.removeItem('token');
            localStorage.removeItem('adminName');
            navigate('/');
        } catch (error) {
            console.error('Logout gagal:', error);
            alert('Logout gagal, silakan coba lagi.');
        }
    };

    return (
        <Drawer
            variant="temporary"
            open={open}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
            sx={{
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    backgroundColor: 'rgba(17, 24, 39, 0.85)',
                    backdropFilter: 'blur(12px)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#E5E7EB',

                    // --- CSS UNTUK MENGHILANGKAN SCROLLBAR ---
                    overflowY: 'auto', // Tetap aktifkan scroll jika konten panjang
                    scrollbarWidth: 'none', // Untuk Firefox
                    '&::-webkit-scrollbar': {
                        display: 'none', // Untuk Chrome, Safari, dan Opera
                    },
                    '-ms-overflow-style': 'none', // Untuk IE dan Edge
                    // ----------------------------------------
                },
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
                <Typography variant="h6" fontWeight="bold">Portal Guru</Typography>
                <IconButton onClick={onClose} sx={{ color: 'white' }}><CloseIcon /></IconButton>
            </Toolbar>
            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />

            <motion.div initial="hidden" animate="visible" variants={listVariants}>
                <List sx={{ p: 1 }}>
                    {menuItems.map((item) => (
                        <motion.div
                            key={item.text}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, x: 8 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => { setView(item.view); onClose(); }}
                                    sx={{ borderRadius: 2, mb: 0.5, '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' } }}
                                >
                                    <ListItemIcon sx={{ color: '#9CA3AF', minWidth: 40 }}>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        </motion.div>
                    ))}
                </List>
            </motion.div>

            <Box sx={{ flexGrow: 1 }} />
            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05, x: 8 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <List sx={{ p: 1 }}>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={handleLogout}
                            sx={{ borderRadius: 2, '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' } }}
                        >
                            <ListItemIcon sx={{ color: '#F87171', minWidth: 40 }}><LogoutIcon /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </motion.div>
        </Drawer>
    );
};

export default AdminSidebar;