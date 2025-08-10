import React, { useState, useEffect } from 'react'; // PERUBAHAN: Menambahkan useEffect
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import HomeIcon from '@mui/icons-material/Home';

import bgImage from '../assets/activate.png'; // Ganti dengan gambar yang sesuai
import logo from '../assets/logo.png';

export default function Activate() {
  // PERUBAHAN: Menambahkan passwordConfirm ke state form
  const [form, setForm] = useState({ email: '', password: '', passwordConfirm: '' });
  const [errors, setErrors] = useState({});
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // PERUBAHAN: Memindahkan logika URL ke dalam useEffect agar lebih aman dan efisien
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailFromUrl = searchParams.get('email');
    if (emailFromUrl) {
      setForm((prev) => ({ ...prev, email: emailFromUrl }));
    }
  }, [location.search]); // Dijalankan hanya jika query URL berubah

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email tidak boleh kosong.';
    if (!form.password) {
      newErrors.password = 'Password baru tidak boleh kosong.';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password minimal harus 8 karakter.';
    }
    if (form.password !== form.passwordConfirm) {
      newErrors.passwordConfirm = 'Konfirmasi password tidak cocok.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Harap perbaiki data yang belum valid.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    const promise = axios.post('http://localhost:3000/api/auth/complete-registration', {
      email: form.email,
      password: form.password,
    });

    toast.promise(promise, {
      loading: 'Mengaktifkan akun...',
      success: (res) => {
        setTimeout(() => navigate('/login'), 1500);
        return res.data.message || 'Akun berhasil diaktifkan!';
      },
      error: (err) => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        return err.response?.data?.message || 'Gagal mengaktifkan akun.';
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
            Atur Password Anda
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)', mb: 4 }}>
            Satu langkah terakhir! Buat password baru yang akan Anda gunakan untuk login.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth label="Email" name="email" type="email"
              value={form.email} onChange={handleChange}
              required sx={textFieldStyles}
              error={!!errors.email} helperText={errors.email}
              InputProps={{ readOnly: !!location.search }} // Email tidak bisa diubah jika dari URL
            />
            <TextField
              fullWidth label="Password Baru (min. 8 karakter)" name="password" type="password"
              value={form.password} onChange={handleChange}
              required sx={textFieldStyles}
              error={!!errors.password} helperText={errors.password}
            />
            <TextField
              fullWidth label="Konfirmasi Password Baru" name="passwordConfirm" type="password"
              value={form.passwordConfirm} onChange={handleChange}
              required sx={textFieldStyles}
              error={!!errors.passwordConfirm} helperText={errors.passwordConfirm}
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
              Aktifkan & Simpan
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}

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