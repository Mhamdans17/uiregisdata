import React, { useState, useEffect } from 'react'; // PERBAIKAN: Menambahkan useEffect
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast'; // Anda bisa menghapus Toaster dari sini jika sudah dipindah ke App.js
import HomeIcon from '@mui/icons-material/Home';

import bgImage from '../assets/registrasi.jpg';
import logo from '../assets/logo.png';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [errors, setErrors] = useState({});
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();

  // PERBAIKAN 1: Menambahkan useEffect untuk membersihkan state saat meninggalkan halaman.
  // Ini akan memperbaiki masalah halaman welcome/home yang menjadi kosong.
  useEffect(() => {
    return () => {
      // Fungsi cleanup ini berjalan saat komponen di-unmount (ditinggalkan)
      setErrors({});
      setForm({ name: '', email: '', age: '' });
      toast.dismiss(); // Membersihkan notifikasi toast yang mungkin masih aktif
    };
  }, []); // Array kosong memastikan ini hanya berjalan sekali saat mount dan unmount.

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Nama lengkap tidak boleh kosong.';
    if (!form.email) {
      newErrors.email = 'Email tidak boleh kosong.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Format email tidak valid.';
    }
    if (!form.age) {
      newErrors.age = 'Umur tidak boleh kosong.';
    } else if (isNaN(form.age) || Number(form.age) <= 0) {
      newErrors.age = 'Umur harus berupa angka positif.';
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

    const promise = axios.post('http://localhost:3000/api/users', form);
    toast.promise(promise, {
      loading: 'Mendaftarkan akun...',
      success: (res) => {
        setTimeout(() => navigate('/activate'), 1500);
        return res.data.message || 'Registrasi berhasil!';
      },
      error: (err) => err.response?.data?.message || 'Terjadi kesalahan server.',
    });
  };

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
      {/* CATATAN: Komponen <Toaster /> sangat direkomendasikan untuk dipindah 
        ke file layout utama Anda (seperti App.js) agar tidak perlu dideklarasikan di setiap halaman.
      */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: { background: '#333', color: '#fff' },
        }}
      />

      {/* Tombol Home */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'absolute', top: 24, left: 24, zIndex: 4 }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate('/')}
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

      {/* Background & Overlay */}
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

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: 24, right: 24, zIndex: 4 }}
      >
        <Box component="img" src={logo} alt="Logo" sx={{ width: 48, height: 48 }} />
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: isShaking ? [-10, 10, -10, 10, 0] : 0,
        }}
        // PERBAIKAN 2: Menghapus transisi 'spring' untuk 'x' yang menyebabkan error di console.
        // Framer Motion akan otomatis menggunakan transisi keyframe yang benar.
        transition={{
          opacity: { duration: 0.6, ease: 'easeOut' },
          scale: { duration: 0.6, ease: 'easeOut' },
          x: { duration: 0.5 } // Cukup definisikan durasi, bukan tipe spring
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
            Buat Akun Baru
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)', mb: 4 }}>
            Pastikan semua data yang Anda masukkan sudah benar dan valid.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth label="Nama Lengkap" name="name"
              value={form.name} onChange={handleChange}
              required sx={textFieldStyles}
              error={!!errors.name} helperText={errors.name}
            />
            <TextField
              fullWidth label="Email" name="email" type="email"
              value={form.email} onChange={handleChange}
              required sx={textFieldStyles}
              error={!!errors.email} helperText={errors.email}
            />
            <TextField
              fullWidth label="Umur" name="age" type="number"
              value={form.age} onChange={handleChange}
              required sx={textFieldStyles}
              error={!!errors.age} helperText={errors.age}
            />

            <Button
              type="submit" fullWidth variant="contained"
              sx={{
                minWidth: 160, px: 3.5, py: 1.3,
                borderRadius: '999px', fontWeight: 600,
                textTransform: 'uppercase',
                boxShadow: '0 8px 20px rgba(25,118,210,0.18)',
                background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                transition: 'transform 220ms ease, box-shadow 220ms ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 14px 30px rgba(25,118,210,0.22)',
                },
              }}
            >
              Daftar
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}

// Tidak ada perubahan pada style, jadi biarkan apa adanya
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