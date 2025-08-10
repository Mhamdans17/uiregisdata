import React, { useState, useEffect } from 'react'; // PERUBAHAN: Menambahkan useEffect
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast'; // PERUBAHAN: Menggunakan react-hot-toast
import HomeIcon from '@mui/icons-material/Home';

// PERUBAHAN: Menggunakan gambar background dan logo yang sama (sesuaikan jika perlu)
import bgImage from '../assets/login.jpg'; // Pastikan path ini benar
import logo from '../assets/logo.png'; // Pastikan path ini benar

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  // PERUBAHAN: Menggunakan state 'errors' untuk validasi per-kolom
  const [errors, setErrors] = useState({});
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();

  // PERUBAHAN: Menambahkan useEffect untuk membersihkan state
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

  // PERUBAHAN: Menambahkan validasi sederhana di frontend
  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email tidak boleh kosong.';
    if (!form.password) newErrors.password = 'Password tidak boleh kosong.';
    return newErrors;
  };

  // PERUBAHAN: Mengubah handleSubmit untuk menggunakan toast.promise dan validasi
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Harap isi semua kolom yang diperlukan.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    const promise = axios.post('http://localhost:3000/api/auth/login', form);

    toast.promise(promise, {
      loading: 'Mencoba masuk...',
      success: (res) => {
        const { user, token } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        setTimeout(() => {
          if (user.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 1000); // Beri sedikit jeda agar user bisa baca pesan sukses

        return res.data.message || 'Login berhasil! Mengalihkan...';
      },
      error: (err) => {
        // Menambahkan efek getar juga saat login gagal dari server
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        return err.response?.data?.message || 'Email atau password salah.';
      },
    });
  };

  // PERUBAHAN: Mengganti seluruh struktur JSX agar sama dengan halaman Register
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ style: { background: '#333', color: '#fff' } }}
      />
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'absolute', top: 24, left: 24, zIndex: 4 }}
      >
        <Button
          variant="outlined" onClick={() => navigate('/')}
          sx={{
            minWidth: 'auto', p: 1.2, color: '#fff',
            borderColor: 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(6px)', borderRadius: '50%',
            '&:hover': {
              borderColor: '#42a5f5',
              backgroundColor: 'rgba(66,165,245,0.08)',
            },
          }}
        >
          <HomeIcon fontSize="medium" />
        </Button>
      </motion.div>

      <Box sx={{ position: 'absolute', inset: 0, backgroundColor: '#000' }} />
      <Box
        sx={{
          position: 'absolute', inset: 0, backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'blur(8px) brightness(0.6)', transform: 'scale(1.05)', zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)',
          zIndex: 2,
        }}
      />

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
            Selamat Datang Kembali
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)', mb: 4 }}>
            Masuk untuk melanjutkan ke akun Anda.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth label="Email" name="email" type="email"
              value={form.email} onChange={handleChange}
              required sx={textFieldStyles}
              error={!!errors.email} helperText={errors.email}
            />
            <TextField
              fullWidth label="Password" name="password" type="password"
              value={form.password} onChange={handleChange}
              required sx={textFieldStyles}
              error={!!errors.password} helperText={errors.password}
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
              Login
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}

// PERUBAHAN: Menambahkan konstanta style untuk TextField agar sama
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