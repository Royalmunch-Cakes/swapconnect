"use client";

import React from "react";
import Image from "next/image";
import { create } from "zustand";

export interface IconTextItem {
  icon: string;
  title: string;
  subtitle: string;
}

interface IconTextSectionProps {
  icon: string;
  title: string;
  subtitle: string;
}

// Zustand store for mobile detection (window width)
interface IconTextSectionStore {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

const useIconTextSectionStore = create<IconTextSectionStore>((set) => ({
  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),
}));

const IconTextSection: React.FC<IconTextSectionProps> = ({
  icon,
  title,
  subtitle,
}) => (
  <div className="flex items-center justify-center">
    <Image
      src={icon}
      alt={title}
      width={50}
      height={50}
      className="mr-3"
      unoptimized
    />
    <div>
      <h6 className="uppercase mb-0 font-bold text-[#037F44]">{title}</h6>
      <p className="mb-0">{subtitle}</p>
    </div>
  </div>
);

interface IconTextCarouselProps {
  iconTextData: IconTextItem[];
}

const IconTextCarousel: React.FC<IconTextCarouselProps> = ({
  iconTextData,
}) => {
  const { isMobile, setIsMobile } = useIconTextSectionStore();

  // Use effect to update isMobile in Zustand store
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobile]);

  if (isMobile) {
    // Show a simple horizontal scroll for mobile
    return (
      <div className="flex overflow-x-auto gap-4 py-4">
        {iconTextData.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center min-w-[140px] flex-shrink-0"
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={50}
              height={50}
              className="mb-2"
              unoptimized
            />
            <div className="text-center">
              <h6 className="uppercase mb-0 font-bold text-[#037F44]">
                {item.title}
              </h6>
              <p className="mb-0">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop: grid layout
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {iconTextData.map((item, idx) => (
        <div key={idx} className="flex items-center">
          <IconTextSection
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
          />
        </div>
      ))}
    </div>
  );
};

export default IconTextCarousel;
