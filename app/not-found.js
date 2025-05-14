'use client';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        bgcolor: '#f9f9f9',
        px: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: { xs: '80px', md: '120px' }, fontWeight: 700, color: 'primary.main' }}
      >
        404
      </Typography>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
        ❌ Oops! Page Not Found
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, maxWidth: 400, color: '#666' }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>

      <Button
        component={Link}
        href="/"
        variant="contained"
        size="large"
        sx={{
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
}
