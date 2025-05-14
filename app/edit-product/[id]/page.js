'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductForm from '../../Components/ProductForm';
import CircularProgress from '@mui/material/CircularProgress';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then(async res => {
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`HTTP ${res.status}: ${errText}`);
        }
        return res.json();
      })
      .then(setProduct)
      .catch(error => {
        console.error(error);
        setError(error.message);
      });
  }, [params.id]);

  const handleSubmit = async (data) => {
    try {
      const response = await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      // Navigate back to home page after successful update
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!product) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px',
      }}>
        <CircularProgress size={48} color="primary" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <ProductForm initialData={product} onSubmit={handleSubmit} />
    </div>
  );
}