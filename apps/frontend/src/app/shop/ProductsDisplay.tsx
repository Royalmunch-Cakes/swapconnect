'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { api } from '@/lib/api';

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

const useProductsDisplayUIStore = create<ProductsDisplayUIState>((set) => ({
  currentPage: 1,
  selectedSort: "Default Sorting",
  minPrice: 0,
  maxPrice: 1000,
  showSortDropdown: false,
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedSort: (sort) => set({ selectedSort: sort }),
  setMinPrice: (price) => set({ minPrice: price }),
  setMaxPrice: (price) => set({ maxPrice: price }),
  setShowSortDropdown: (show) => set({ showSortDropdown: show }),
}));

const sortOptions = [
  "Default Sorting",
  "Price: Low to High",
  "Price: High to Low",
  "Newest Arrivals",
];

const ProductsDisplay = () => {
  const { products, loading, error, fetchProducts } = useProductStore();
  const { addToCart, carts } = useCartStore();

  const {
    currentPage,
    selectedSort,
    minPrice,
    maxPrice,
    showSortDropdown,
    setCurrentPage,
    setSelectedSort,
    setMinPrice,
    setMaxPrice,
    setShowSortDropdown,
  } = useProductsDisplayUIStore();

  // Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${backendUrl}/api/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: ApiResponse = await res.json();
        setProducts(data.data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [fetchProducts]);

  // Reset to page 1 on sort/filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [minPrice, maxPrice, selectedSort, setCurrentPage]);

  // Filtered and sorted products
  const processedProducts = useMemo(() => {
    const filtered = products.filter((product: Product) => {
      const numericPrice = Number(String(product.price).replace(/[^\d.]/g, ""));
      return numericPrice >= minPrice && numericPrice <= maxPrice;
    });

    if (selectedSort === "Price: Low to High") {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (selectedSort === "Price: High to Low") {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (selectedSort === "Newest Arrivals") {
      filtered.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    }

    return filtered;
  }, [products, minPrice, maxPrice, selectedSort]);

  const productsPerPage = 16;
  const totalFilteredProducts = processedProducts.length;
  const totalFilteredPages = Math.ceil(totalFilteredProducts / productsPerPage);

  const displayedProducts = processedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleSortSelect = (option: string) => {
    setSelectedSort(option);
    setShowSortDropdown(false);
  };

  const handlePriceChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const value = Number(e.target.value);
    if (type === "min") setMinPrice(value);
    else setMaxPrice(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-700"></div>
        <span className="ml-3 text-lg text-gray-600">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative inline-block">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
        <button
          onClick={fetchProducts}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative inline-block">
          <strong className="font-bold">No Products Found</strong>
          <span className="block sm:inline ml-2">
            {searchQuery || categoryFilter || priceRange
              ? 'Try adjusting your search criteria'
              : 'No products available at the moment'}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Products Section */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600 mr-2"></span>
              <span className="text-gray-600">Loading products...</span>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
              Error:{" "}
              {typeof error === "object" && error && "message" in error
                ? (error as { message: string }).message
                : String(error)}
            </div>
          ) : totalFilteredProducts === 0 ? (
            <div className="bg-blue-100 text-blue-700 p-4 rounded mb-4">
              No products match your filter criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  isInCart={carts.some((item) => item.id === product.id)}
                />
              ))}
            </div>
          )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {/* Page numbers */}
          <div className="flex space-x-1">
            {[...Array(Math.min(5, totalPages))].map((_, index) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = index + 1;
              } else if (currentPage <= 3) {
                pageNumber = index + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + index;
              } else {
                pageNumber = currentPage - 2 + index;
              }

              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-2 rounded-md border border-gray-300 ${
                    pageNumber === currentPage
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalFilteredPages}
                aria-label="Next page"
              >
                <FaAngleRight />
              </button>
            </div>
          )}
        </div>

        {/* Sidebar - Price Filter */}
        <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-4 h-fit">
          <h5 className="font-semibold mb-4">Filter By Price</h5>
          <div className="mb-4">
            <label
              htmlFor="minPrice"
              className="block text-sm text-gray-700 mb-1"
            >
              Min Price: ₦{minPrice}
            </label>
            <input
              id="minPrice"
              type="range"
              min={0}
              max={1000}
              value={minPrice}
              onChange={(e) => handlePriceChange(e, "min")}
              className="w-full accent-green-600"
            />
          </div>
          <div>
            <label
              htmlFor="maxPrice"
              className="block text-sm text-gray-700 mb-1"
            >
              Max Price: ₦{maxPrice}
            </label>
            <input
              id="maxPrice"
              type="range"
              min={0}
              max={1000}
              value={maxPrice}
              onChange={(e) => handlePriceChange(e, "max")}
              className="w-full accent-green-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDisplay;
