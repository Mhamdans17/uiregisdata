import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Alert,
  Avatar,
  Container,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(false);
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', form);
      const { user, token } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setMessage(res.data.message || 'Login berhasil');

      setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      }, 1000);
    } catch (err) {
      setError(true);
      setMessage(err.response?.data?.message || 'Login gagal');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background dengan blur */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/src/assets/login.jpg)', // Ganti sesuai file kamu
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px) brightness(0.6)',
          zIndex: 0,
        }}
      />

      {/* Konten login */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 4,
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 1 }}>
                <LoginIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" component="h1">
                Masuk ke Akun Anda
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 3, py: 1.5, textTransform: 'uppercase', fontWeight: 'bold' }}
              >
                Login
              </Button>
            </Box>

            {message && (
              <Alert severity={error ? 'error' : 'success'} sx={{ mt: 3 }}>
                {message}
              </Alert>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default Login;
