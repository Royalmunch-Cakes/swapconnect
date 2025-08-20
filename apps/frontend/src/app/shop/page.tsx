"use client";

export const dynamic = "force-dynamic";

import CategorySearch from "./CategorySearch";
import ProductsDisplay from "./ProductsDisplay";

const ShopPage = () => (
  <div className="mx-5 max-w-6xl">
    <CategorySearch />
    <ProductsDisplay />
  </div>
);

export default ShopPage;
