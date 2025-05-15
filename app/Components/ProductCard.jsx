'use client';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import Image from 'next/image';

const StyledCard = styled(Card)(({ theme }) => ({
  width: 'calc(25% - 24px)',
  minWidth: 320,
  marginBottom: '45px',
  borderRadius: '16px',
  padding: '16px',
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
  '@media (max-width: 1200px)': {
    width: 'calc(33.33% - 24px)', 
  },
  '@media (max-width: 900px)': {
    width: 'calc(50% - 24px)', 
  },
  '@media (max-width: 600px)': {
    width: 'calc(100% - 24px)', 
  },
}));

export default function ProductCard({ product, onDelete, onRestore }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [deletedProduct, setDeletedProduct] = useState(null);

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenDialog(false);
    setDeletedProduct(product);
    onDelete(product.id);
    setSnackOpen(true); 
  };

  const handleUndo = () => {
    if (deletedProduct) {
      onRestore(deletedProduct);
      setSnackOpen(false); 
    }
  };

  const truncatedTitle = product.title.split(' ').slice(0, 3).join(' ') + (product.title.split(' ').length > 3 ? '...' : '');

  return (
    <>
      <StyledCard sx={{ cursor: 'pointer'}} >
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.title}
          sx={{
            objectFit: 'contain',
            p: 2,
            backgroundColor: '#ffffff', // Always white background
            borderRadius: '8px 8px 0 0',
          }}
        />
        <CardContent sx={{ padding: 2 }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600, fontSize: '1.1rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {truncatedTitle}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 1.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              height: '40px',
            }}
          >
            {product.description}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
              ${product.price}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating 
                name="product-rating" 
                value={product.rating?.rate || 0} 
                precision={0.1} 
                readOnly 
                size="small"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                ({product.rating?.count || 0})
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <CardActions sx={{ padding: 2, justifyContent: 'space-between' }}>
          <Button
            component={Link}
            href={`/edit-product/${product.id}`}
            variant="contained"
            startIcon={<EditIcon />}
            size="small"
            sx={{
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Edit
          </Button>
          <Button
            onClick={handleDeleteClick}
            variant="contained"
            startIcon={<DeleteIcon />}
            size="small"
            color="error"
            sx={{
              '&:hover': {
                bgcolor: 'error.dark',
              },
            }}
          >
            Delete
          </Button>
        </CardActions>
      </StyledCard>

      {/* Dialog for confirmation */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Do you really want to delete <strong>{truncatedTitle}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>


      <Snackbar 
        open={snackOpen} 
        autoHideDuration={5000}  
        onClose={() => setSnackOpen(false)} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert 
          onClose={() => setSnackOpen(false)} 
          severity="success" 
          elevation={6} 
          variant="filled"
          action={
            <Button color="inherit" size="small" onClick={handleUndo}>
              Undo
            </Button>
          }
        >
          Product deleted successfully.
        </MuiAlert>
      </Snackbar>
    </>
  );
}
