"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BorderlessCardProps {
  productName: string;
  category: string;
  imageUrl: string;
  backgroundColor: string;
  link: string;
}

const BorderlessCard: React.FC<BorderlessCardProps> = ({
  productName,
  category,
  imageUrl,
  backgroundColor,
  link,
}) => {
  return (
    <Link href={link} passHref>
      <div
        className="relative flex flex-col justify-start p-6 rounded-2xl overflow-hidden h-60 transition-transform duration-300 hover:scale-105"
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        {/* Text content */}
        <div className="relative z-10">
          {" "}
          <p className="uppercase text-white opacity-80 text-sm font-semibold mb-1">
            {productName}
          </p>
          <h3 className="text-white font-bold text-4xl leading-tight mb-4 uppercase">
            {category}
          </h3>
          <button
            className="bg-white text-gray-800 px-6 py-2 cursor-pointer rounded-full text-sm font-semibold hover:bg-gray-100 transition duration-200"
            type="button"
            onClick={(e) => e.stopPropagation()}
          >
            Check
          </button>
        </div>

        {/* Image positioned absolutely to the bottom right */}
        <div className="absolute right-0 bottom-0 z-0 w-full h-full flex items-end justify-end">
          <Image
            src={imageUrl}
            alt={category}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "auto",
              height: "80%",
              maxHeight: "180px",
              objectFit: "contain",
            }}
            className="object-contain"
          />
        </div>
      </div>
    </Link>
  );
};

export default BorderlessCard;
