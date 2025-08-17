// stores/useProductStore.ts
import { create } from "zustand";
import axios from "axios";

// --- Type Definitions ---
interface ProductImage {
  src: string;
  alt: string;
}

interface ProductSpec {
  label: string;
  details: string;
  active: boolean; // Note: 'active' here could imply default selection, handled by `selectedSpec`
}

interface ProductFeatures {
  [key: string]: string; // e.g., { "TYPE": "LAPTOP", "RAM": "16 GB" }
}

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  description: string;
  images: ProductImage[];
  specs: ProductSpec[];
  features: ProductFeatures;
  // Add other product properties as needed
}

interface OtherProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  // Add other properties for similar/other products
}

interface ProductShowcaseState {
  // Main Product Data (simulated for now, would come from API)
  product: ProductDetail | null;
  activeImage: string;
  selectedSpecIndex: number;
  showFeatures: boolean;
  selectedPlan: string;
  loading: boolean;
  similarProducts: OtherProduct[]; // Renamed from `products` to be more specific
  durations: string[];

  // Actions
  fetchProductData: (categoryName: string, productId?: string) => Promise<void>;
  setActiveImage: (imageUrl: string) => void;
  setSelectedSpecIndex: (index: number) => void;
  toggleFeatures: () => void;
  setSelectedPlan: (plan: string) => void;
  // Add any other actions that modify this state
}

// --- Initial Data (can be moved to a backend API) ---
// This will be dynamic based on `categoryName` and `productId`
const initialProductData: ProductDetail = {
  id: "laptop-pro-2023",
  name: "Laptop Pro 2023",
  price: 450000,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  images: [
    {
      src: "https://res.cloudinary.com/ds83mhjcm/image/upload/v1747324047/SwapConnect/Products%20Categories/laptop_pro_2023_ab4gyw.png",
      alt: "Laptop Pro 2023 - Front",
    },
    {
      src: "https://res.cloudinary.com/ds83mhjcm/image/upload/v1747324046/SwapConnect/Products%20Categories/laptop_pro_2023-2_d8pvog.png",
      alt: "Laptop Pro 2023 - Side",
    },
    {
      src: "https://res.cloudinary.com/ds83mhjcm/image/upload/v1747324046/SwapConnect/Products%20Categories/laptop_pro_2023-3_io5ywz.png",
      alt: "Laptop Pro 2023 - Keyboard",
    },
    {
      src: "https://res.cloudinary.com/ds83mhjcm/image/upload/v1747324315/SwapConnect/Products%20Categories/laptop_pro_2023-4_eftusl.png",
      alt: "Laptop Pro 2023 - Screen",
    },
  ],
  specs: [
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
  ],
  features: {
    TYPE: "LAPTOP",
    RAM: "16 GB",
    SSD: "1000 GB",
    "PROCESSOR TYPE": "INTEL CORE I7-12700H",
    "PROCESSOR SPEED": "2.3 - 4.7 GHz",
    "DISPLAY SIZE INCH": '16.0"',
    "DISPLAY SIZE SM": "40.64 cm",
    "DISPLAY TYPE": "OLED, TOUCHSCREEN, 120 Hz",
    "DISPLAY RESOLUTION": "2880x1620",
    "VIDEO CARD TYPE": "INTEL ARC A370M GRAPHICS",
    "GRAPHIC MEMORY SIZE": "4 GB GDDR6",
    "WEB CAMERA": "720p + IR",
    OS: "WINDOWS 11 PRO",
  },
};

// --- Zustand Store Creation ---
const useProductStore = create<ProductShowcaseState>((set) => ({
  // Initial state
  product: null, // Will be loaded dynamically
  activeImage: "",
  selectedSpecIndex: 0,
  showFeatures: true,
  selectedPlan: "3",
  loading: true,
  similarProducts: [],
  durations: ["3", "6", "12", "16", "18"],

  // Actions
  fetchProductData: async (categoryName, productId = "laptop-pro-2023") => {
    set({ loading: true, product: null });
    try {
      // In a real application, you'd fetch data from your API:
      // const response = await axios.get(`/api/products/${categoryName}/${productId}`);
      // const productData = response.data;

      // For this example, we'll simulate fetching `initialProductData`
      // and filter similar products if needed.
      const productData = initialProductData; // Use the hardcoded data for now

      // Simulate fetching similar products from your JSON
      const similarProductsResponse = await axios.get(
        "/json/RecentlyUploaded.json"
      );
      const allProducts: OtherProduct[] = similarProductsResponse.data || [];
      const filteredSimilarProducts = allProducts.filter(
        (p) => p.category === categoryName && p.id !== productId
      );

      set({
        product: productData,
        activeImage: productData.images[0]?.src || "", // Set initial active image
        selectedSpecIndex: 0, // Reset selected spec
        similarProducts: filteredSimilarProducts,
        loading: false,
      });
    } catch (error) {
      console.error(
        `Error fetching product data for ${categoryName}/${productId}:`,
        error
      );
      set({ loading: false, product: null, similarProducts: [] });
    }
  },

  setActiveImage: (imageUrl) => set({ activeImage: imageUrl }),
  setSelectedSpecIndex: (index) => set({ selectedSpecIndex: index }),
  toggleFeatures: () => set((state) => ({ showFeatures: !state.showFeatures })),
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
}));

export default useProductStore;
