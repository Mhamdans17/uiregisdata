import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import HomeIcon from '@mui/icons-material/Home';

// Ganti dengan gambar yang sesuai untuk halaman ini
import bgImage from '../assets/forgot-password.png'; 
import logo from '../assets/logo.png';

export default function ForgotPassword() {
  // PERUBAHAN: Menggunakan state 'form' dan 'errors' untuk konsistensi
  const [form, setForm] = useState({ email: '' });
  const [errors, setErrors] = useState({});
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();
  
  // PERUBAHAN: Menambahkan useEffect untuk cleanup (best practice)
  useEffect(() => {
    return () => {
      setErrors({});
      toast.dismiss();
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = 'Email tidak boleh kosong.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Format email tidak valid.';
    }
    return newErrors;
  };
  
  // PERUBAHAN: Mengubah handleSubmit untuk menggunakan toast.promise dan validasi
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Harap masukkan email yang valid.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    const promise = axios.post('http://localhost:3000/api/auth/forgot-password', form);

    toast.promise(promise, {
      loading: 'Memeriksa email...',
      success: (res) => {
        const { resetToken } = res.data;
        // Navigasi ke halaman reset password dengan token
        setTimeout(() => navigate(`/reset-password?token=${resetToken}`), 1000);
        return 'Link reset telah dibuat! Mengalihkan...';
      },
      error: (err) => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        return err.response?.data?.message || 'Email tidak ditemukan atau terjadi kesalahan.';
      },
    });
  };

  // PERUBAHAN: Mengganti seluruh struktur JSX agar sama dengan halaman lainnya
  return (
    <Box
      sx={{
        position: 'relative', display: 'flex', alignItems: 'center',
        justifyContent: 'center', minHeight: '100vh',
        overflow: 'hidden', fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { background: '#333', color: '#fff' } }} />
      <motion.div
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
        style={{ position: 'absolute', top: 24, left: 24, zIndex: 4 }}
      >
        <Button variant="outlined" onClick={() => navigate('/')} sx={{
          minWidth: 'auto', p: 1.2, color: '#fff',
          borderColor: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(6px)',
          borderRadius: '50%', '&:hover': {
            borderColor: '#42a5f5', backgroundColor: 'rgba(66,165,245,0.08)',
          },
        }}>
          <HomeIcon fontSize="medium" />
        </Button>
      </motion.div>

      <Box sx={{ position: 'absolute', inset: 0, backgroundColor: '#000' }} />
      <Box sx={{
        position: 'absolute', inset: 0, backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(8px) brightness(0.6)', transform: 'scale(1.05)', zIndex: 1,
      }} />
      <Box sx={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)',
      }} />

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: 24, right: 24, zIndex: 4 }}
      >
        <Box component="img" src={logo} alt="Logo" sx={{ width: 48, height: 48 }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{
          opacity: 1, scale: 1,
          x: isShaking ? [-10, 10, -10, 10, 0] : 0,
        }}
        transition={{
          opacity: { duration: 0.6, ease: 'easeOut' },
          scale: { duration: 0.6, ease: 'easeOut' },
          x: { duration: 0.5 },
        }}
        style={{
          position: 'relative', zIndex: 3, width: '100%',
          maxWidth: 420, willChange: 'transform, opacity',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 }, borderRadius: 4, textAlign: 'center',
            backgroundColor: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 10px 30px rgba(2,6,23,0.45)',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: 700, color: '#fff', mb: 1, letterSpacing: '0.5px' }}>
            Lupa Password?
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)', mb: 4 }}>
            Jangan khawatir! Masukkan email Anda untuk verifikasi dan kami akan mengarahkan Anda.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth label="Email" name="email" type="email"
              value={form.email} onChange={handleChange}
              required sx={textFieldStyles}
              error={!!errors.email} helperText={errors.email}
            />
            <Button
              type="submit" fullWidth variant="contained"
              sx={{
                mt: 2, minWidth: 160, px: 3.5, py: 1.3, borderRadius: '999px',
                fontWeight: 600, textTransform: 'uppercase',
                boxShadow: '0 8px 20px rgba(25,118,210,0.18)',
                background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                transition: 'transform 220ms ease, box-shadow 220ms ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 14px 30px rgba(25,118,210,0.22)',
                },
              }}
            >
              Kirim
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}

// Menambahkan konstanta style untuk TextField agar sama
const textFieldStyles = {
  mb: 2.5,
  '& .MuiFormHelperText-root': {
    color: '#ff8a80', fontWeight: 500,
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#42a5f5' },
  '& .MuiOutlinedInput-root': {
    color: '#fff', borderRadius: '12px',
    backgroundColor: 'rgba(0,0,0,0.25)',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#42a5f5', borderWidth: '1px' },
    '&.Mui-error fieldset': { borderColor: '#ff8a80' },
  },
};