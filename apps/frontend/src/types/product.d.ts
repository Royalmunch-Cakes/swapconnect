// types/product.d.ts

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductSpec {
  label: string;
  details: string;
}

export interface ProductFeatures {
  [key: string]: string; // e.g., { "TYPE": "LAPTOP", "RAM": "16 GB" }
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string; // Crucial for filtering in lists/grids
  images: ProductImage[];
  specs: ProductSpec[];
  features?: ProductFeatures; // Optional features table
  stock?: number;
  isTopSale?: boolean;
  availability?: string; // e.g., "In stock", "Out of stock"
  // Add any other properties your products might have
}

// For your RecentlyUploaded.json, it looks like each item is a Product
// If it contains an array of products: Product[]
export interface RecentlyUploadedResponse {
  products: Product[];
}
