// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  isTopSale: boolean;
  stock: number;
  // Add any other properties your products might have
}
