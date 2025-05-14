'use client';
import { useEffect, useState } from 'react';
import ProductCard from '../app/Components/ProductCard';
import Link from 'next/link';
import styles from './Styles/home.module.css';
import { TextField, Box } from '@mui/material';
import { Typography, Button, Alert, Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ThemeToggle from './Components/ThemeToggle';


export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        return res.json(); 
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className={styles.container}>
      <ThemeToggle />
      {loading ? (
        <>
          {/* Skeleton for title, search input, and add button */}
          <Box sx={{ mb: 4, position: 'relative' }}>
            <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: { xs: 'center', sm: 'center' },
                position: 'relative',
              }}
            >
              <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
            </Box>
          </Box>

          {/* Skeleton for search bar */}
          <Box sx={{ display: 'flex', justifyContent: 'center', m: 8 }}>
            <Skeleton variant="rectangular" width="70%" height={50} sx={{ borderRadius: 2 }} />
          </Box>

          {/* Skeleton for product grid */}
          <div className={styles.productsGrid}>
            {[...Array(4)].map((_, index) => (
              <Box key={index} sx={{ width: '100%', mb: 2 }}>
                <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2 }} />
                <Skeleton variant="text" width="60%" sx={{ mt: 2 }} />
                <Skeleton variant="text" width="40%" sx={{ mt: 1 }} />
                <Skeleton variant="rectangular" width="50%" height={40} sx={{ mt: 2 }} />
              </Box>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Wrapper for title and button */}
          <Box sx={{ mb: 4, position: 'relative' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: { xs: 'center', sm: 'center' },
                position: 'relative',
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 700,
                  textAlign: 'center',
                  flex: 1,
                }}
              >
                All Products
              </Typography>
              <Box
                sx={{
                  mt: { xs: 2, sm: 0 },
                  position: { xs: 'static', sm: 'absolute' },
                  right: { sm: 0 },
                  top: { sm: 0 },
                }}
              >
                <Button
                  component={Link}
                  href="/add-product"
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  Add Product
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Search Bar */}
          <Box sx={{ display: 'flex', justifyContent: 'center', m: 8 }}>
            <TextField
              label="Search Products"
              variant="outlined"
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: { xs: '100%', md: '70%' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: (theme) => 
                    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f9f9f9',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  transition: '0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    backgroundColor: (theme) => 
                      theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#f5f5f5',
                  },
                  '& fieldset': {
                    borderColor: (theme) => 
                      theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : '#ccc',
                  },
                  '&:hover fieldset': {
                    borderColor: (theme) => 
                      theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#888',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root': {
                  fontWeight: 500,
                  color: (theme) => 
                    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#666',
                },
                '& .MuiInputBase-input': {
                  color: (theme) => 
                    theme.palette.mode === 'dark' ? '#fff' : 'inherit',
                },
                '& .Mui-focused .MuiInputLabel-root': {
                  color: 'primary.main',
                },
              }}
            />
          </Box>

        {/* Display No Products Found Message */}
        {filteredProducts.length === 0 && searchQuery && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              mt: 5,
              mb: 5,
            }}
          >
          <Alert
            severity="info"
            sx={(theme) => ({
              width: '100%',
              maxWidth: '600px',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #2d3748, #4a5568)' 
                : 'linear-gradient(45deg, rgb(208, 212, 223), #e2e8f0)',
              color: theme.palette.mode === 'dark' ? '#f7fafc' : 'inherit',
              padding: '16px',
            })}
          >
            <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
              No products found.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Try another search term or check your spelling.
            </Typography>
          </Alert>

      </Box>
    )}

   
          <div className={styles.productsGrid}>
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} onDelete={handleDelete} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
