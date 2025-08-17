"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { create } from "zustand";
import SimilarProducts from "../SimilarProducts";
import ReviewForm from "../ReviewForm";
import OtherProducts from "../OtherProducts";

// Zustand store for state management
interface LaptopContentStore {
  activeImage: string;
  setActiveImage: (img: string) => void;
  selectedSpec: number;
  setSelectedSpec: (idx: number) => void;
  showOnlyActive: boolean;
  setShowOnlyActive: (val: boolean) => void;
  showFeatures: boolean;
  toggleFeatures: () => void;
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
  products: unknown[];
  setProducts: (products: unknown[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const images = [
  "https://res.cloudinary.com/ds83mhjcm/image/upload/v1747324047/SwapConnect/Products%20Categories/laptop_pro_2023_ab4gyw.png",
  "https://res.cloudinary.com/ds83mhjcm/image/upload/v1747324046/SwapConnect/Products%20Categories/laptop_pro_2023-2_d8pvog.png",
  "https://res.cloudinary.com/ds83mhjcm/image/upload/v1747324046/SwapConnect/Products%20Categories/laptop_pro_2023-3_io5ywz.png",
  "https://res.cloudinary.com/ds83mhjcm/image/upload/v1747324315/SwapConnect/Products%20Categories/laptop_pro_2023-4_eftusl.png",
];

const specs = [
  {
    label: "12.5” 512GB",
    details: "2.4GHz Quad Core\n8GB RAM | 512GB SSD",
    active: true,
  },
  {
    label: "12.5” 512GB",
    details: "2.4GHz Quad Core\n8GB RAM | 512GB SSD",
    active: false,
  },
  {
    label: "13.3” 1TB",
    details: "2.4GHz Quad Core\n8GB RAM | 512GB SSD",
    active: false,
  },
  {
    label: "13.3” 1TB",
    details: "2.4GHz Quad Core\n8GB RAM | 512GB SSD",
    active: false,
  },
];

const durations = ["3", "6", "12", "16", "18"];
const productTitle = "Laptop Pro 2023";

const useLaptopContentStore = create<LaptopContentStore>((set) => ({
  activeImage: images[0],
  setActiveImage: (img) => set({ activeImage: img }),
  selectedSpec: 0,
  setSelectedSpec: (idx) => set({ selectedSpec: idx }),
  showOnlyActive: false,
  setShowOnlyActive: (val) => set({ showOnlyActive: val }),
  showFeatures: true,
  toggleFeatures: () => set((state) => ({ showFeatures: !state.showFeatures })),
  selectedPlan: "3",
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  products: [],
  setProducts: (products) => set({ products }),
  loading: true,
  setLoading: (loading) => set({ loading }),
}));

const fetchProducts = async (
  setProducts: (products: unknown[]) => void,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
  try {
    const res = await fetch("/json/RecentlyUploaded.json");
    const data = await res.json();
    setProducts(data || []);
  } catch {
    setProducts([]);
  } finally {
    setLoading(false);
  }
};

const ProductShowcase = () => {
  const {
    activeImage,
    setActiveImage,
    selectedSpec,
    setSelectedSpec,
    showOnlyActive,
    setShowOnlyActive,
    showFeatures,
    toggleFeatures,
    selectedPlan,
    setSelectedPlan,
    setProducts,
    setLoading,
    loading,
  } = useLaptopContentStore();

  useEffect(() => {
    fetchProducts(setProducts, setLoading);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="py-10 w-full flex flex-col items-center">
      {loading ? (
        <div className="text-center my-4">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-500">Loading similar products...</p>
        </div>
      ) : (
        <div className="w-full max-w-7xl px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left - Images */}
            <div className="w-full md:w-1/2 flex flex-col items-center mb-6 md:mb-0">
              <div
                className="mb-4 bg-gray-100 rounded-xl p-4 w-full max-w-md"
                style={{ minHeight: 320 }}
              >
                <Image
                  src={activeImage}
                  alt="Laptop"
                  width={420}
                  height={400}
                  className="object-contain w-full h-[320px] md:h-[400px] rounded"
                  priority
                />
              </div>
              {!showOnlyActive && (
                <div className="flex flex-wrap gap-3 justify-center">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      className={`border rounded p-1 transition-all ${
                        activeImage === img
                          ? "border-green-600 shadow"
                          : "border-gray-300"
                      }`}
                      style={{ width: 80, height: 60 }}
                      onClick={() => {
                        setActiveImage(img);
                        setShowOnlyActive(true);
                      }}
                      type="button"
                    >
                      <Image
                        src={img}
                        alt={`thumb-${idx}`}
                        width={80}
                        height={60}
                        className="object-contain w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right - Details */}
            <div className="w-full md:w-1/2">
              <h3 className="font-bold text-2xl mb-3">{productTitle}</h3>
              <p className="text-gray-500 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {specs.map((spec, index) => (
                  <button
                    key={index}
                    className={`rounded-lg border px-4 py-3 text-left transition-all ${
                      selectedSpec === index
                        ? "border-green-600 shadow bg-green-50"
                        : "border-gray-200 text-gray-500 bg-white"
                    }`}
                    onClick={() => setSelectedSpec(index)}
                    type="button"
                  >
                    <div className="font-semibold">{spec.label}</div>
                    <div className="text-xs whitespace-pre-line">
                      {spec.details}
                    </div>
                  </button>
                ))}
              </div>
              <div className="mb-4">
                <span className="font-semibold text-lg">Price: </span>
                <span className="font-bold text-green-700 text-xl">
                  ₦450,000
                </span>
              </div>
              <p className="text-gray-500 flex items-center mb-2">
                🚚 Delivery{" "}
                <span className="text-green-600 ml-2">5 working days</span>
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {durations.map((num) => (
                  <button
                    key={num}
                    className={`px-4 py-2 rounded-full border transition ${
                      selectedPlan === num
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
                    }`}
                    onClick={() => setSelectedPlan(num)}
                    type="button"
                  >
                    {num} months
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mb-4">
                <button
                  className="border border-green-600 text-green-700 px-6 py-2 rounded-full font-semibold hover:bg-green-50 transition w-1/2"
                  // onClick={() => addToCart(productForCart)}
                  type="button"
                >
                  <span className="mr-2">🛒</span>Add to Cart
                </button>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-green-600">✔</span>
                <span>Swap Enabled Device</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mb-6">
                <Link href="/swap" className="w-full sm:w-1/2">
                  <button
                    className="bg-green-600 text-white px-6 py-2 rounded-full w-full font-semibold hover:bg-green-700 transition"
                    type="button"
                  >
                    Swap
                  </button>
                </Link>
                <Link href="#" className="w-full sm:w-1/2">
                  <button
                    className="border border-green-600 text-green-700 px-6 py-2 rounded-full w-full font-semibold hover:bg-green-50 transition"
                    type="button"
                  >
                    Pay installments
                  </button>
                </Link>
              </div>
              <div className="bg-white rounded-xl shadow p-6 mb-6">
                <div className="font-bold text-center mb-4 text-lg">
                  Features
                </div>
                <div className={`${showFeatures ? "block" : "hidden"}`}>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr>
                        <td className="py-1">TYPE</td>
                        <td className="py-1">LAPTOP</td>
                      </tr>
                      <tr>
                        <td className="py-1">RAM</td>
                        <td className="py-1">16 GB</td>
                      </tr>
                      <tr>
                        <td className="py-1">SSD</td>
                        <td className="py-1">1000 GB</td>
                      </tr>
                      <tr>
                        <td className="py-1">PROCESSOR TYPE</td>
                        <td className="py-1">INTEL CORE I7-12700H</td>
                      </tr>
                      <tr>
                        <td className="py-1">PROCESSOR SPEED</td>
                        <td className="py-1">2.3 - 4.7 GHz</td>
                      </tr>
                      <tr>
                        <td className="py-1">DISPLAY SIZE INCH</td>
                        <td className="py-1">16.0&#34;</td>
                      </tr>
                      <tr>
                        <td className="py-1">DISPLAY SIZE SM</td>
                        <td className="py-1">40.64 cm</td>
                      </tr>
                      <tr>
                        <td className="py-1">DISPLAY TYPE</td>
                        <td className="py-1">OLED, TOUCHSCREEN, 120 Hz</td>
                      </tr>
                      <tr>
                        <td className="py-1">DISPLAY RESOLUTION</td>
                        <td className="py-1">2880x1620</td>
                      </tr>
                      <tr>
                        <td className="py-1">VIDEO CARD TYPE</td>
                        <td className="py-1">INTEL ARC A370M GRAPHICS</td>
                      </tr>
                      <tr>
                        <td className="py-1">GRAPHIC MEMORY SIZE</td>
                        <td className="py-1">4 GB GDDR6</td>
                      </tr>
                      <tr>
                        <td className="py-1">WEB CAMERA</td>
                        <td className="py-1">720p + IR</td>
                      </tr>
                      <tr>
                        <td className="py-1">OS</td>
                        <td className="py-1">WINDOWS 11 PRO</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center mt-2">
                  <button
                    className="text-green-700 hover:underline text-sm"
                    onClick={toggleFeatures}
                    type="button"
                  >
                    {showFeatures ? "Show less ▲" : "Show more ▼"}
                  </button>
                </div>
              </div>
            </div>
            {/* Similar Products */}
            <div className="w-full md:w-auto lg:w-1/4 mt-8 md:mt-0">
              <SimilarProducts />
            </div>
          </div>
          <div className="mt-10">
            <ReviewForm productTitle={productTitle} />
          </div>
          <div className="mt-10">
            <OtherProducts />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductShowcase;
