"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import CategoryProductsDisplay from "@/components/CategoryProductsDisplay";

type CategoryPageProps = {
  params: Promise<{ categoryName: string }>;
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const { categoryName } = use(params);

  if (!categoryName) notFound();

  // Convert kebab-case to title case for display
  const displayName = categoryName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center">
            {displayName} Products
          </h1>
          <p className="text-lg text-gray-600 text-center mt-2">
            Discover amazing {displayName.toLowerCase()} products
          </p>
        </div>
        <CategoryProductsDisplay categoryName={categoryName} />
      </div>
    </div>
  );
}
