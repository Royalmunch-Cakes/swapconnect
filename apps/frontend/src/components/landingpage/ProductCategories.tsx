"use client";
import React from "react";
import BorderlessCard from "./CardCategory";

const cardData = [
  {
    productName: "ios",
    category: "Apple",
    imageUrl:
      "https://res.cloudinary.com/ds83mhjcm/image/upload/v1719573351/SwapConnect/home/categories/apple_t6b7my.png",
    backgroundColor: "red",
    link: "/category/apple",
  },
  {
    productName: "Bluetooths",
    category: "Speakers",
    imageUrl:
      "https://res.cloudinary.com/ds83mhjcm/image/upload/v1719573351/SwapConnect/home/categories/speakers_rfiz7v.png",
    backgroundColor: "#FBC52D",
    link: "/category/speakers",
  },
  {
    productName: "Watches",
    category: "Handband",
    imageUrl:
      "https://res.cloudinary.com/ds83mhjcm/image/upload/v1719573351/SwapConnect/home/categories/handband_crl0o1.png",
    backgroundColor: "black",
    link: "/category/handband",
  },
  {
    productName: "Accessories",
    category: "Mouse",
    imageUrl:
      "https://res.cloudinary.com/ds83mhjcm/image/upload/v1719573351/SwapConnect/home/categories/mouse_cm3v2k.png",
    backgroundColor: "blue",
    link: "/category/mouse",
  },
  {
    productName: "Androids",
    category: "Mobile",
    imageUrl:
      "https://res.cloudinary.com/ds83mhjcm/image/upload/v1719573351/SwapConnect/home/categories/mobile_cy7ugt.png",
    backgroundColor: "green",
    link: "/category/mobile",
  },
  {
    productName: "Laptops",
    category: "MacBook",
    imageUrl:
      "https://res.cloudinary.com/ds83mhjcm/image/upload/v1719573351/SwapConnect/home/categories/macbook_hdscrm.png",
    backgroundColor: "skyblue",
    link: "/category/macbook",
  },
];

const ProductCategories: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <BorderlessCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
