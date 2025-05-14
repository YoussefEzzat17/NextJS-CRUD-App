import { NextResponse } from 'next/server';
import data from '../../../data/data.json';

let products = data || [];  


export function GET() {
  return NextResponse.json(products, { status: 200 });
}


export async function POST(req) {
  const body = await req.json();
  const newProduct = { id: Date.now(), ...body };
  products.push(newProduct); 
  return NextResponse.json(products, { status: 200 });
}
