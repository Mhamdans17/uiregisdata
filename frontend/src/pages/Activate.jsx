import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import LockOpenIcon from '@mui/icons-material/LockOpen';

function Activate() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil email dari query string (opsional)
  const searchParams = new URLSearchParams(location.search);
  const emailFromUrl = searchParams.get('email');

  // Jika ada dari URL, isi otomatis
  if (emailFromUrl && form.email === '') {
    setForm((prev) => ({ ...prev, email: emailFromUrl }));
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(false);
    try {
      const res = await axios.post('http://localhost:3000/api/auth/complete-registration', form);
      setMessage(res.data.message || 'Akun berhasil diaktifkan');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(true);
      setMessage(err.response?.data?.message || 'Gagal mengaktifkan akun');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f6f8',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 1 }}>
              <LockOpenIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6" component="h1">
              Aktivasi Akun
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
              Aktifkan Akun
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
  );
}

export default Activate;
