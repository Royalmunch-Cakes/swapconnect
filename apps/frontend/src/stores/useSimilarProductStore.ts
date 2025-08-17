import { create } from "zustand";
import axios from "axios";

// --- Type Definitions ---
export interface SimilarProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  isTopSale?: boolean;
  description?: string;
  stock?: number;
}

interface SimilarProductsStoreState {
  products: SimilarProduct[];
  loading: boolean;
  startIndex: number;
  productsPerPage: number;

  fetchProducts: () => Promise<void>;
  showPrev: () => void;
  showNext: () => void;
}

// --- Zustand Store Creation ---
const useSimilarProductsStore = create<SimilarProductsStoreState>((set) => ({
  // Initial state
  products: [],
  loading: true,
  startIndex: 0,
  productsPerPage: 3,

  // Actions
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/json/RecentlyUploaded.json");
      const data: SimilarProduct[] = response.data || [];
      set({ products: data, loading: false, startIndex: 0 });
    } catch (error) {
      console.error("Error fetching similar products:", error);
      set({ loading: false, products: [] });
    }
  },

  showPrev: () => {
    set((state) => {
      const newIndex = state.startIndex - 1;
      return {
        startIndex: newIndex < 0 ? state.products.length - 1 : newIndex,
      };
    });
  },

  showNext: () => {
    set((state) => {
      const newIndex = state.startIndex + 1;
      return { startIndex: newIndex >= state.products.length ? 0 : newIndex };
    });
  },
}));

export default useSimilarProductsStore;
