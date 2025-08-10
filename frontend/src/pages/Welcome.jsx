// src/pages/Welcome.jsx
import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Paper, Stack, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

import bgImage from '../assets/welcomeBG.jpg';
import logo1 from '../assets/logo.png';

export default function Welcome() {
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());

  // Update waktu setiap detik
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fadeSlide = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        overflow: 'hidden',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Background blur */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px) brightness(0.55)',
          zIndex: -3,
        }}
      />

      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 100%)',
          zIndex: -2,
        }}
      />

      {/* Soft vignette */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.45) 100%)',
          zIndex: -1,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }}
      />

      {/* Logo pojok kanan atas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        <Box
          component="img"
          src={logo1}
          alt="Logo"
          sx={{
            width: { xs: 38, sm: 48 },
            height: { xs: 38, sm: 48 },
            objectFit: 'contain',
            borderRadius: '8px',
            p: 0.5,
          }}
        />
      </motion.div>

      {/* Card utama */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.2 }}
        style={{
          width: '100%',
          maxWidth: 820,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: 3,
            textAlign: 'center',
            backgroundColor: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 10px 30px rgba(2,6,23,0.45)',
          }}
        >
          {/* Judul */}
          <motion.div variants={fadeSlide} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                fontSize: { xs: '1.4rem', sm: '1.9rem', md: '2.2rem' },
                textShadow: '0 6px 18px rgba(0,0,0,0.45)',
                mb: 1,
              }}
            >
              Selamat Datang di Portal Resmi 
              <br />
              SD Negeri 1 Tokyo
            </Typography>

            {/* Tagline tambahan */}
            <Typography
              variant="subtitle2"
              sx={{
                color: 'rgba(255,255,255,0.85)',
                fontStyle: 'italic',
                mb: 2,
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              "Bersama Mencerdaskan Anak Bangsa"
            </Typography>
          </motion.div>

          {/* Deskripsi */}
          <motion.div variants={fadeSlide} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'rgba(255,255,255,0.92)',
                fontWeight: 400,
                fontSize: { xs: '0.95rem', sm: '1rem' },
                maxWidth: 760,
                mx: 'auto',
                mb: 3,
                lineHeight: 1.6,
                textShadow: '0 4px 10px rgba(0,0,0,0.25)',
              }}
            >
              Portal ini disediakan untuk memudahkan pengelolaan data sekolah, mulai dari pendaftaran siswa baru oleh orang tua/wali murid, hingga pengaturan data akademik oleh pihak sekolah.  
              Silakan pilih menu di bawah untuk memulai.
            </Typography>
          </motion.div>

          {/* Tombol */}
          <motion.div variants={fadeSlide} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 2, sm: 3 }}
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 1.5 }}
            >
              <Button
                aria-label="Daftar akun baru"
                variant="contained"
                startIcon={<PersonAddIcon />}
                onClick={() => navigate('/register')}
                sx={{
                  minWidth: 160,
                  px: 3.5,
                  py: 1.3,
                  borderRadius: '999px',
                  fontWeight: 600,
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

              <Button
                variant="outlined"
                startIcon={<LoginIcon />}
                onClick={() => navigate('/login')}
                sx={{
                  minWidth: 160,
                  px: 3.5,
                  py: 1.3,
                  borderRadius: '999px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.95)',
                  borderColor: 'rgba(255,255,255,0.12)',
                  backgroundColor: 'transparent',
                  transition: 'transform 220ms ease, background-color 220ms ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    borderColor: 'rgba(255,255,255,0.18)',
                  },
                }}
              >
                Login
              </Button>
            </Stack>
          </motion.div>

          {/* Lupa Password */}
          <motion.div variants={fadeSlide} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <Link
                component="button"
                onClick={() => navigate('/forgot-password')}
                underline="hover"
                sx={{
                  color: 'rgba(144,202,249,0.95)',
                  fontWeight: 500,
                  fontSize: '0.92rem',
                }}
              >
                Lupa Password?
              </Link>
            </Typography>
          </motion.div>
        </Paper>
      </motion.div>

      {/* DateTime pojok kiri bawah */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        style={{
          position: 'absolute',
          bottom: 12,
          left: 16,
          color: 'rgba(255,255,255,0.85)',
          fontSize: '0.5rem',
          fontWeight: 500,
          textShadow: '0 2px 6px rgba(0,0,0,0.5)',
          letterSpacing: '0.5px',
        }}
      >
        {dateTime.toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}{' '}
        • {dateTime.toLocaleTimeString('id-ID')}
      </motion.div>
    </Box>
  );
}
