// src/pages/Welcome.js
import { Button, Typography, Box, Paper, Stack, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/welcomeBG.jpg';

function Welcome() {
  const navigate = useNavigate();

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
        bgcolor: 'transparent',
      }}
    >
      {/* Background image dengan efek blur */}
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#ccc',
          filter: 'blur(8px) brightness(0.6)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />

      {/* Konten utama */}
      <Paper
        elevation={8}
        sx={{
          p: 6,
          borderRadius: 5,
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.6)', 
          maxWidth: 600,
          width: '100%',
          backdropFilter: 'blur(20px)', // lebih blur
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Selamat Datang
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Silakan pilih salah satu aksi di bawah.
        </Typography>

        <Stack spacing={2}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ py: 1.5, fontSize: '1rem', fontWeight: 'bold' }}
            onClick={() => navigate('/register')}
          >
            Daftar Sekarang
          </Button>
          <Button
            variant="outlined"
            size="large"
            fullWidth
            sx={{ py: 1.5, fontSize: '1rem', fontWeight: 'bold' }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Stack>

        {/* Tambahan link Reset Password */}
        <Typography variant="body2" sx={{ mt: 4 }}>
          <Link
            component="button"
            onClick={() => navigate('/forgot-password')}
            underline="hover"
            sx={{ color: 'primary.main', fontWeight: 500 }}
          >
            Lupa Password?
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Welcome;