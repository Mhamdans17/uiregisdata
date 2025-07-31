import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  IconButton,
  InputAdornment,
  Fade,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromURL = queryParams.get('token');
    setToken(tokenFromURL || '');
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!token) {
      setErrorMsg('Token reset password tidak tersedia.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Password dan konfirmasi tidak cocok.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/auth/reset-password', {
        token,
        newPassword,
      });

      setSuccessMsg(res.data?.message || 'Password berhasil direset!');
      setTimeout(() => navigate('/login'), 1000); // lebih cepat
    } catch (error) {
      console.error(error.response?.data || error.message);
      setErrorMsg(error.response?.data?.message || 'Terjadi kesalahan.');
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#f4f6f8',
          p: 2,
        }}
      >
        <Paper elevation={4} sx={{ padding: { xs: 4, sm: 6 }, maxWidth: 550, width: '100%', borderRadius: 4 }}>
          <Typography variant="h5" gutterBottom>
            Atur Ulang Password
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Silakan masukkan password baru untuk akunmu.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Password Baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Konfirmasi Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Simpan Password Baru
            </Button>
          </form>

          {successMsg && (
            <>
              <Fade in={true}>
                <Alert severity="success" sx={{ mt: 3 }}>{successMsg}</Alert>
              </Fade>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                Mengalihkan ke halaman login...
              </Typography>
            </>
          )}
          {errorMsg && (
            <Fade in={true}>
              <Alert severity="error" sx={{ mt: 3 }}>{errorMsg}</Alert>
            </Fade>
          )}
        </Paper>
      </Box>

      {/* Footer info admin */}
      <Typography
        variant="caption"
        sx={{
          position: 'fixed',
          bottom: 12,
          right: 16,
          color: 'gray',
        }}
      >
        Butuh bantuan? Hubungi admin di imtokyodev@gmail.com
      </Typography>
    </>
  );
};

export default ResetPassword;
