"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaExchangeAlt, FaShoppingCart, FaHeart, FaStar } from "react-icons/fa";

interface Product {
  id: string;
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
  onAddToCart?: (product: any) => void;
  isInCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  isInCart,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating = 4) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-3 h-3 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const IconButton = ({ icon: Icon, label, onClick, active = false }: any) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-full transition-colors ${
        active
          ? "bg-green-600 text-white"
          : "bg-white text-gray-600 hover:bg-green-600 hover:text-white"
      }`}
      title={label}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div
        className="relative bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ minHeight: "340px" }}
      >
        {/* Product badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.swappable && (
            <span className="bg-green-600 text-white text-xs rounded-full px-3 py-1 mb-1">
              Swappable
            </span>
          )}
          {product.installmentAvailable && (
            <span className="bg-blue-600 text-white text-xs rounded-full px-3 py-1">
              Installment
            </span>
          )}
        </div>

        {/* Product image */}
        <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
          <Image
            width={200}
            height={200}
            src={
              product.imageUrl ||
              "/placeholder.svg?height=200&width=200&query=product"
            }
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
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                // handleCompare(product)
              }}
            />
            <IconButton
              icon={FaShoppingCart}
              label="Add to cart"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                onAddToCart?.(product);
              }}
              active={isInCart}
            />
            <IconButton
              icon={FaHeart}
              label="Add to wishlist"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                // handleWishlist(product)
              }}
            />
          </div>
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

          {/* Rating */}
          <div className="flex mb-1">{renderStars(4)}</div>

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
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
