// export const fetchRecentlyUploaded = async () => {
// try {
// const response = await fetch("/json/RecentlyUploaded.json");
// if (!response.ok) {
// throw new Error("Failed to fetch data");
// }
// const data = await response.json();
// return data;
// } catch (error) {
// console.error("Error fetching recently uploaded products:", error);
// return [];
// }
// };

import React from "react";
import Image from "next/image";
import { Product } from "@/types/trade-in";

interface RecentlyUploadedProductsProps {
  products: Product[];
}

const RecentlyUploadedProducts: React.FC<RecentlyUploadedProductsProps> = ({
  products,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {products.map((product) => (
      <div
        key={product.id}
        className="rounded-lg shadow-md p-3 border border-gray-200 flex flex-col items-center"
      >
        <div className="relative w-full h-32 mb-2">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-2 w-full text-center">
          <h4 className="text-sm font-semibold mb-1 text-gray-800 truncate">
            {product.name}
          </h4>
          <p className="text-xs text-gray-600 mb-1 truncate">
            {product.description}
          </p>
          <p className="text-xs text-gray-700 mb-2">
            Price:{" "}
            <strong className="font-bold">
              ₦
              {product.price.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </strong>
          </p>
          <p
            className={`text-xs font-medium ${
              product.availability === "in stock"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {product.availability}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default RecentlyUploadedProducts;
