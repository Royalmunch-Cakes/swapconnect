import { create } from "zustand";
import axios from "axios";

// --- Type Definitions ---
export interface OtherProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  availability: string;
  stock?: number;
  tag?: string;
  category?: string;
}

interface OtherProductsStoreState {
  products: OtherProduct[];
  startIdx: number;
  productsPerPage: number;
  loading: boolean;

  fetchProducts: () => Promise<void>;
  handlePrev: () => void;
  handleNext: () => void;
  addToCart: (product: OtherProduct) => void;
}

// --- Zustand Store Creation ---
const useOtherProductsStore = create<OtherProductsStoreState>((set) => ({
  // Initial state
  products: [],
  startIdx: 0,
  productsPerPage: 5,
  loading: true,

  // Actions
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/json/RecentlyUploaded.json");
      const data: OtherProduct[] = response.data || [];
      // Ensure each product has an 'id' for keys
      const productsWithIds = data.map((p, index) => ({
        ...p,
        id: p.id || `other-product-${index}`, // Assign a fallback ID if missing
        category: p.category || "general", // Ensure category exists for links
      }));
      set({ products: productsWithIds, loading: false, startIdx: 0 }); // Reset startIdx on new fetch
    } catch (error) {
      console.error("Failed to fetch other products:", error);
      set({ loading: false, products: [] });
    }
  },

  handlePrev: () => {
    set((state) => {
      const newIndex = state.startIdx - state.productsPerPage;
      return {
        startIdx:
          newIndex < 0
            ? Math.max(0, state.products.length - state.productsPerPage)
            : newIndex,
      };
    });
  },

  handleNext: () => {
    set((state) => {
      const newIndex = state.startIdx + state.productsPerPage;
      return {
        startIdx: newIndex >= state.products.length ? 0 : newIndex, // Wrap around
      };
    });
  },

  addToCart: (product) => {
    // This should ideally dispatch to your main `useCartStore`
    // For now, keep the console log for demonstration
    console.log("Adding to cart from OtherProducts:", product);
    // Example: useCartStore.getState().addToCart(product);
  },
}));

export default useOtherProductsStore;
