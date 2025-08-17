import React from "react";
import Image from "next/image";

const SummerSaleBanner: React.FC = () => {
  return (
    <div className="bg-green-700 rounded-3xl p-8 md:p-12 lg:p-5 mx-4 sm:mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Text Column */}
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-white text-4xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Summer Sale
          </h1>
          <p className="text-white text-lg md:text-lg mb-6 opacity-90">
            Enjoy unbeatable deals on top tech this summer! Save big on laptops,
            accessories, and more. Limited time only—shop now and upgrade your
            devices for less!
          </p>
          <button className="bg-white text-green-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
            Check
          </button>
        </div>

        {/* Image Column */}
        <div className="md:w-1/2 flex justify-end items-end h-full">
          <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg aspect-[4/3]">
            <Image
              src="https://res.cloudinary.com/ds83mhjcm/image/upload/v1719573354/SwapConnect/home/summersale_ekbelu.png"
              alt="Summer Sale"
              fill
              className="object-cover rounded-3xl"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummerSaleBanner;
