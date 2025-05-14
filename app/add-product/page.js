'use client';
import { useRouter } from 'next/navigation';
import ProductForm from '../Components/ProductForm';

export default function AddProductPage() {
  const router = useRouter();

  const handleCreateProduct = async (data) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      // Redirect to home page after successful creation
      router.push('/');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <ProductForm onSubmit={handleCreateProduct} />
    </div>
  );
}
