'use client';
import { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Box, 
  Container,
  IconButton,
  Fade,
  CircularProgress,
  Grid
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import ThemeToggle from '../Components/ThemeToggle';
import { Padding } from '@mui/icons-material';

export default function ProductForm({ initialData, onSubmit }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
    rating: {
      rate: '',
      count: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        rating: initialData.rating || { rate: '', count: '' }
      });
      setPreview(initialData.image);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.title) newErrors.name = 'Name is required';
    if (!form.description) newErrors.description = 'Description is required';
    if (!form.image) newErrors.image = 'Image URL is required';
    if (!form.price || form.price <= 0) newErrors.price = 'Valid price is required';

    if (!form.rating.rate || form.rating.rate < 0 || form.rating.rate > 5) {
      newErrors.rating = { ...(newErrors.rating || {}), rate: 'Rating (0-5) is required' };
    }

    if (!form.rating.count || form.rating.count < 0) {
      newErrors.rating = { ...(newErrors.rating || {}), count: 'Count must be positive' };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'rate' || name === 'count') {
      setForm(prev => ({
        ...prev,
        rating: {
          ...prev.rating,
          [name]: name === 'count' ? parseInt(value) || '' : parseFloat(value) || ''
        }
      }));

      if (errors.rating?.[name]) {
        setErrors(prev => ({
          ...prev,
          rating: { ...prev.rating, [name]: '' }
        }));
      }

      return;
    }

    setForm(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value,
    }));

    if (name === 'image') {
      setPreview(value);
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (validateForm()) {
      onSubmit(form);
      setLoading(false);
    }
  };

  return (<div className='p-5'> 
    <Box sx={{ position: 'absolute', top: 30, left: 30 }}>
        <ThemeToggle />
    </Box>
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Paper elevation={3} sx={{ 
        p: 4, 
        borderRadius: 3,
        background: (theme) => theme.palette.mode === 'dark' 
          ? 'linear-gradient(to right bottom, #1a1a1a, #2d2d2d)'
          : 'linear-gradient(to right bottom, #ffffff, #f0f2f5)',
        boxShadow: (theme) => theme.palette.mode === 'dark'
          ? '0 4px 12px rgba(0,0,0,0.5)'
          : '0 4px 12px rgba(0,0,0,0.1)',
      }}>
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 2,
          }}
        >
          <IconButton
            component={Link}
            href="/"
            sx={{
              bgcolor: (theme) => 
                theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'grey.100',
              color: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'inherit',
              '&:hover': { 
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'grey.200',
              },
              alignSelf: { xs: 'flex-start', md: 'center' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: { xs: 'center', md: 'center' },
              width: '100%',
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                fontWeight: 600,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textAlign: 'center',
              }}
            >
              {initialData ? 'Edit Product' : 'Add New Product'}
            </Typography>
          </Box>
        </Box>

        {preview && (
          <Fade in={true}>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <img 
                src={preview} 
                alt="Product preview" 
                style={{ 
                  maxHeight: '200px', 
                  maxWidth: '100%', 
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }} 
              />
            </Box>
          </Fade>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Product Name"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: (theme) => 
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f9f9f9',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
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
              },
              '& .MuiInputLabel-root': {
                color: (theme) => 
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#666',
              },
              '& .MuiInputBase-input': {
                color: (theme) => 
                  theme.palette.mode === 'dark' ? '#fff' : 'inherit',
              },
            }}
          />

          <TextField
            label="Image URL"
            name="image"
            value={form.image}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.image}
            helperText={errors.image}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: (theme) => 
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f9f9f9',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
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
              },
              '& .MuiInputLabel-root': {
                color: (theme) => 
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#666',
              },
              '& .MuiInputBase-input': {
                color: (theme) => 
                  theme.palette.mode === 'dark' ? '#fff' : 'inherit',
              },
            }}
          />

          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            required
            error={!!errors.description}
            helperText={errors.description}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: (theme) => 
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f9f9f9',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
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
              },
              '& .MuiInputLabel-root': {
                color: (theme) => 
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#666',
              },
              '& .MuiInputBase-input': {
                color: (theme) => 
                  theme.palette.mode === 'dark' ? '#fff' : 'inherit',
              },
            }}
          />

          <TextField
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.price}
            helperText={errors.price}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: (theme) => 
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f9f9f9',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
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
              },
              '& .MuiInputLabel-root': {
                color: (theme) => 
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#666',
              },
              '& .MuiInputBase-input': {
                color: (theme) => 
                  theme.palette.mode === 'dark' ? '#fff' : 'inherit',
              },
              '& .MuiInputAdornment-root .MuiTypography-root': {
                color: (theme) => 
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'inherit',
              },
            }}
          />

{/* Rating Fields - Added Here */}

{/* Rating Fields - Added Here */}
<Box sx={{ display: 'flex', gap: '8px', width: '100%' }}>
  <Box sx={{ width: '50%' }}>
    <TextField
      label="Rating (0-5)"
      name="rate"
      type="number"
      value={form.rating.rate}
      onChange={handleChange}
      fullWidth
      required
      error={!!errors.rating?.rate}
      helperText={errors.rating?.rate}
      sx={{
        width: '100%',
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          backgroundColor: (theme) => 
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f9f9f9',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
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
        },
        '& .MuiInputLabel-root': {
          color: (theme) => 
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#666',
        },
        '& .MuiInputBase-input': {
          color: (theme) => 
            theme.palette.mode === 'dark' ? '#fff' : 'inherit',
        },
      }}
    />
  </Box>
<Box sx={{ width: '50%' }}>
    <TextField
      label="Rating Count"
      name="count"
      type="number"
      value={form.rating.count}
      onChange={handleChange}
      fullWidth
      required
      error={!!errors.rating?.count}
      helperText={errors.rating?.count}
      sx={{
        width: '100%',
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          backgroundColor: (theme) => 
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f9f9f9',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
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
        },
        '& .MuiInputLabel-root': {
          color: (theme) => 
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#666',
        },
        '& .MuiInputBase-input': {
          color: (theme) => 
            theme.palette.mode === 'dark' ? '#fff' : 'inherit',
        },
      }}
    />
  </Box>
</Box>




          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: '50%' }}
              startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Product'}
            </Button>

            <Button
              variant="outlined"
              color="error"
              component={Link}
              href="/"
              sx={{ width: '50%' }}
              startIcon={<ArrowBackIcon />}
            >
              Cancel
            </Button>
            
          </Box>
          
        </Box>
        
      </Paper>
    </Container>
    </div>
  );
} 