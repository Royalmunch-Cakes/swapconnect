'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  brand?: string;
  description?: string;
  price: number;
  imageUrl: string;
  otherImages?: string[];
  views: number;
  isActive: boolean;
  swappable: boolean;
  installmentAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  Category?: {
    name: string;
  };
  Account?: {
    firstName: string;
    lastName: string;
  };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className="relative bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 group"
      onMouseEnter={() => setHoveredId(product.id)}
      onMouseLeave={() => setHoveredId(null)}
      style={{ minHeight: "340px" }}
    >
      {/* Product badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.isNew && (
          <span className="bg-green-600 text-white text-xs rounded-full px-3 py-1 mb-1">
            New
          </span>
        )}
        {product.discount && (
          <span className="bg-red-600 text-white text-xs rounded-full px-3 py-1">
            {product.discount}
          </span>
        )}
      </div>

      {/* Product image */}
      <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name || "Product image"}
          className={`object-contain w-full h-3/5 transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />

        {/* Action buttons */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-3 bg-black bg-opacity-10 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <IconButton
            icon={FaExchangeAlt}
            label="Compare"
            onClick={() => {
              // handleCompare(product)
            }}
          />
          <IconButton
            icon={FaShoppingCart}
            label="Add to cart"
            onClick={() => onAddToCart?.(product)}
            active={isInCart}
          />
          <IconButton
            icon={FaHeart}
            label="Add to wishlist"
            onClick={() => {
              // handleWishlist(product)
            }}
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          {product.Category && (
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              {product.Category.name}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
            {product.name}
          </h3>

          {/* Brand */}
          {product.brand && (
            <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-green-600">
              {formatPrice(product.price)}
            </p>

            {/* Seller info */}
            {product.Account && (
              <p className="text-xs text-gray-500">
                by {product.Account.firstName} {product.Account.lastName}
              </p>
            )}
          </div>

      {/* Product details */}
      <div className="p-4 flex flex-col h-[120px]">
        <div className="flex mb-1">{renderStars(product.rating)}</div>
        <h5 className="font-semibold text-base truncate mb-1">
          {product.name}
        </h5>
        <p className="font-bold text-green-700 mt-auto text-lg">
          ₦{Number(product.price).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
