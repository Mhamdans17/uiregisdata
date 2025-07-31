import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
} from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/forgot-password', { email });
      const resetToken = response.data.resetToken;

      setMessage('Link reset telah dibuat! Silakan masukkan password baru.');
      navigate(`/reset-password?token=${resetToken}`);
    } catch (err) {
      setError('Email tidak ditemukan atau terjadi kesalahan.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f0f2f5',
        p: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: { xs: 4, sm: 6 },
          maxWidth: 550,
          width: '100%',
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Lupa Password
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3} fontSize={18}>
          Masukkan email akunmu untuk verifikasi data.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
            InputProps={{ sx: { fontSize: 18, py: 1.5 } }}
            InputLabelProps={{ sx: { fontSize: 18 } }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, py: 1.5, fontSize: 18 }}
          >
            CEK EMAIL MU
          </Button>
        </form>

        {message && <Alert severity="success" sx={{ mt: 4, fontSize: 16 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 4, fontSize: 16 }}>{error}</Alert>}
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
