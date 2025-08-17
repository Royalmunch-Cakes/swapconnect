import { create } from "zustand";

export interface Review {
  name: string;
  email: string;
  review: string;
  rating: number;
  date: string;
}

export interface ReviewFormState {
  name: string;
  email: string;
  review: string;
}

interface ReviewStore {
  productTitle: string;
  reviews: Review[];
  form: ReviewFormState;
  rating: number;
  hover: number | null;
  currentReviewIndex: number;
  setProductTitle: (title: string) => void;
  loadReviews: (title: string) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setRating: (rating: number) => void;
  setHover: (hover: number | null) => void;
  handleSubmit: (e: React.FormEvent) => void;
  nextReview: () => void;
  prevReview: () => void;
}

const initialReviews: Review[] = [
  {
    name: "Jane Doe",
    email: "jane@example.com",
    review: "Great product, highly recommend!",
    rating: 5,
    date: new Date().toISOString(),
  },
  {
    name: "John Smith",
    email: "john@example.com",
    review: "Good value for the price.",
    rating: 4,
    date: new Date().toISOString(),
  },
];

const useReviewStore = create<ReviewStore>((set, get) => ({
  productTitle: "this product",
  reviews: initialReviews,
  form: { name: "", email: "", review: "" },
  rating: 0,
  hover: null,
  currentReviewIndex: 0,

  setProductTitle: (title) => set({ productTitle: title }),

  loadReviews: () => {
    // In a real app, fetch reviews for the product here
    // For demo, just reset to initialReviews
    set({ reviews: initialReviews, currentReviewIndex: 0 });
  },

  handleChange: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      form: { ...state.form, [name]: value },
    }));
  },

  setRating: (rating) => set({ rating }),
  setHover: (hover) => set({ hover }),

  handleSubmit: (e) => {
    e.preventDefault();
    const { form, rating, reviews } = get();
    if (!form.name || !form.email || !form.review || !rating) return;
    const newReview: Review = {
      ...form,
      rating,
      date: new Date().toISOString(),
    };
    set({
      reviews: [newReview, ...reviews],
      form: { name: "", email: "", review: "" },
      rating: 0,
      currentReviewIndex: 0,
    });
  },

  nextReview: () => {
    const { currentReviewIndex, reviews } = get();
    if (currentReviewIndex < reviews.length - 1) {
      set({ currentReviewIndex: currentReviewIndex + 1 });
    }
  },

  prevReview: () => {
    const { currentReviewIndex } = get();
    if (currentReviewIndex > 0) {
      set({ currentReviewIndex: currentReviewIndex - 1 });
    }
  },
}));

export default useReviewStore;
