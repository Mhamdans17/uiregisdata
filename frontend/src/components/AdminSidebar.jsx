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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const drawerWidth = 240;

const AdminSidebar = ({ open, onClose, setView }) => {
  const navigate = useNavigate();

  const menu = [
    { text: 'Dashboard', path: '/admin/dashboard', view: 'home' },
    { text: 'Kelola Admin', path: '', view: 'manage-admin' },
  ];

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
    </Drawer>
  );
};

export default AdminSidebar;
