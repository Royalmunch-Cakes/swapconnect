// components/ProductList.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  stock: number;
  isTopSale?: boolean;
  category: string; // Ensure product has a category for linking
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center text-center relative hover:shadow-xl transition-shadow duration-300"
        >
          {product.isTopSale && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
              Top Sale
            </span>
          )}
          <div className="w-full h-40 relative mb-2 flex justify-center items-center">
            <Image
              src={product.image || "/placeholder-product.png"}
              alt={product.name}
              width={180}
              height={180}
              style={{ objectFit: "contain" }}
              className="rounded-md"
            />
          </div>
          <h3 className="font-semibold text-lg mb-1 text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xl font-bold text-green-600 mb-2">
            Price:{" "}
            {product.price.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </p>
          <p className="text-sm text-gray-600 mb-2 min-h-[40px] overflow-hidden line-clamp-2">
            {product.description}
          </p>
          <span
            className={`font-semibold mb-4 text-sm ${
              product.stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </span>
          <Link
            href={`/product-categories/${product.category}/${product.id}`}
            passHref
          >
            <button className="px-4 py-2 border border-green-700 text-green-700 rounded-full font-semibold hover:bg-green-50 transition-colors duration-200 text-sm mt-auto">
              View Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
