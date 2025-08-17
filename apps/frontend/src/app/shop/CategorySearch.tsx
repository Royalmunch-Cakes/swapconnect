"use client";

import { FaSearch, FaAngleDown } from "react-icons/fa";
import { useState } from "react";

// Example product data
const products = [
  { id: 1, name: "iPhone 15", category: "iPhone" },
  { id: 2, name: "Samsung Galaxy S24", category: "Android" },
  { id: 3, name: "MacBook Pro", category: "MacBook" },
  { id: 4, name: "Dell XPS", category: "Windows PC" },
  { id: 5, name: "AirPods", category: "Electronics" },
  { id: 6, name: "Pixel 8", category: "Android" },
];

const categories = [
  "Electronics",
  "iPhone",
  "Android",
  "MacBook",
  "Windows PC",
];

const CategorySearch = () => {
  // Use local state for UI
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<typeof products>([]);
  const [showResults, setShowResults] = useState(false);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  const handleSearch = () => {
    let filtered = products;
    if (selectedCategory !== "Category") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
    setShowResults(true);
  };

  return (
    <div className="flex flex-col items-center py-5 my-5">
      <div className="w-full max-w-2xl rounded-full shadow-md flex bg-white">
        {/* Category Dropdown */}
        <div className="relative">
          <button
            className="flex items-center px-6 py-3 bg-[#037f44] text-white rounded-l-full focus:outline-none focus:bg-[#025f34] hover:bg-[#025f34] transition-colors"
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-expanded={showDropdown}
          >
            {selectedCategory}
            <FaAngleDown className="ml-2" />
          </button>
          {showDropdown && (
            <ul className="absolute left-0 top-full z-10 w-full bg-white border border-gray-200 rounded-b-xl shadow-lg mt-1">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    className="w-full text-left px-6 py-2 hover:bg-gray-100 focus:bg-gray-100 transition-colors"
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Search Input */}
        <input
          type="text"
          className="flex-1 px-4 py-3 bg-[#f1f1f1] border-none outline-none text-sm placeholder-[#888]"
          placeholder="Search products..."
          aria-label="Search input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        {/* Search Button */}
        <button
          className="flex items-center px-6 py-3 bg-[#037f44] text-white rounded-r-full hover:bg-[#025f34] focus:bg-[#025f34] transition-colors"
          type="button"
          onClick={handleSearch}
        >
          <FaSearch />
        </button>
      </div>

      {/* Results */}
      {showResults && (
        <div className="w-full max-w-2xl mt-4 bg-white rounded shadow p-4">
          {filteredProducts.length === 0 ? (
            <div className="text-gray-500 text-center">No products found.</div>
          ) : (
            <ul>
              {filteredProducts.map((product) => (
                <li key={product.id} className="py-2 border-b last:border-b-0">
                  <span className="font-medium">{product.name}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    ({product.category})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CategorySearch;
