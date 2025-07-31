// src/components/AdminSidebar.jsx
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Toolbar,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const drawerWidth = 240;

const AdminSidebar = ({ open, onClose, setView }) => {
  const navigate = useNavigate();

  const menu = [
    { text: 'Dashboard', path: '/admin/dashboard', view: 'home' },
    { text: 'Kelola Admin', path: '', view: 'manage-admin' },
  ];

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token tidak ditemukan');
        return;
      }

      await axios.post(
        'http://localhost:3000/api/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem('token');
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
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: 'rgba(25, 118, 210, 0.3)',
          backdropFilter: 'blur(10px)',
          color: '#fff',
        },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Admin Panel
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Toolbar>

      <List>
        {menu.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => {
              if (item.path) navigate(item.path);
              setView(item.view);
              onClose();
            }}
            sx={{
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: 2 }} />

      <List>
        <ListItem
          button
          onClick={() => {
            handleLogout();
            onClose();
          }}
          sx={{
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
          }}
        >
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
