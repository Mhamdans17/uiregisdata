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
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate(); // ✅ Tambahkan ini

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(false);
    try {
      const res = await axios.post('http://localhost:3000/api/users', form);
      setMessage(res.data.message || 'Registrasi berhasil');

      // ✅ Redirect setelah sukses registrasi
      setTimeout(() => {
        navigate('/activate');
      }, 1500); // jeda 1.5 detik supaya alert sempat muncul

    } catch (err) {
      setError(true);
      setMessage(err.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f2f5',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 1 }}>
              <PersonAddAltIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6" component="h1">
              Buat Akun Baru
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Nama Lengkap"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
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
              label="Umur"
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 3,
                py: 1.5,
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}
            >
              Daftar Sekarang
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

export default Register;
