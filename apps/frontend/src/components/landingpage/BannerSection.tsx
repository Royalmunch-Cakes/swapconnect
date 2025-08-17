import React from "react";
import Image from "next/image"; // Import Next.js Image component

const BannerSection: React.FC = () => {
  return (
    <section className="relative w-full h-[300px] overflow-hidden">
      <Image
        src="https://res.cloudinary.com/ds83mhjcm/image/upload/v1719573354/SwapConnect/home/home-banner_h9gjlp.png"
        alt="SwapConnect Home Banner"
        layout="fill"
        objectFit="cover"
        quality={80}
        priority
      />
      <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
    </section>
  );
};

export default BannerSection;
