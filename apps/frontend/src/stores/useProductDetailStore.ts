import { create } from "zustand";
import axios from "axios";

export interface ProductSpec {
  label: string;
  details: string;
}

export interface FetchedProductDetail {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  specs: ProductSpec[];
  features?: Record<string, string>;
}

interface ProductDetailState {
  product: FetchedProductDetail | null;
  activeImage: string;
  selectedSpecIndex: number;
  showFeatures: boolean;
  selectedPlan: string;
  loading: boolean;
  error: string | null;
  durations: string[];

  fetchProduct: (productId: string) => Promise<void>;
  setActiveImage: (imageSrc: string) => void;
  setSelectedSpecIndex: (index: number) => void;
  toggleFeatures: () => void;
  setSelectedPlan: (plan: string) => void;
}

const useProductDetailStore = create<ProductDetailState>((set) => ({
  product: null,
  activeImage: "",
  selectedSpecIndex: 0,
  showFeatures: true,
  selectedPlan: "3",
  loading: false,
  error: null,
  durations: ["3", "6", "12", "16", "18"],

  fetchProduct: async (productId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<FetchedProductDetail[]>(
        "/json/RecentlyUploaded.json"
      );
      const allProducts = response.data;

      const foundProduct = allProducts.find((p) => p.id === productId);

      if (!foundProduct) {
        set({ product: null, loading: false, error: "Product not found." });
        return;
      }

      set({
        product: foundProduct,
        activeImage: foundProduct.image || "",
        selectedSpecIndex: 0,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
      set({
        loading: false,
        error: "Failed to load product details. Please try again.",
      });
    }
  },

  setActiveImage: (imageSrc) => set({ activeImage: imageSrc }),
  setSelectedSpecIndex: (index) => set({ selectedSpecIndex: index }),
  toggleFeatures: () => set((state) => ({ showFeatures: !state.showFeatures })),
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
}));

export default useProductDetailStore;
