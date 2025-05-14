import { NextResponse } from 'next/server';
import  products from '../../../../data/data.json';

// GET /api/products/[id]
export async function GET(request, { params }) {
  const id = parseInt(params.id);
  const product = products.find(p => p.id === id);
  
  if (product) {
    return NextResponse.json(product);
  }
  return NextResponse.json({ message: 'Not found' }, { status: 404 });
}

// DELETE /api/products/[id]
export async function DELETE(request, { params }) {
  const id = parseInt(params.id);
  const index = products.findIndex(p => p.id === id);
  
  if (index !== -1) {
    products.splice(index, 1);
    return NextResponse.json({ message: 'Product deleted successfully' });
  }
  return NextResponse.json({ message: 'Product not found' }, { status: 404 });
}

// PUT /api/products/[id]
export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const updatedData = await request.json();
    const index = products.findIndex(p => p.id === id);
    
    if (index !== -1) {
      products[index] = { 
        ...products[index], 
        ...updatedData,
        id: products[index].id 
      };
      return NextResponse.json(products[index]);
    }
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating product' }, { status: 500 });
  }
}