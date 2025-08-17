import { create } from "zustand";

// Define the shape of a single blog post
interface Blog {
  id: string;
  title: string;
  image: string;
  price: number; // Assuming this is a price, though 'blog.price' in original code is unusual
  excerpt: string;
  // Add any other properties your blog objects might have
}

// Define the store's state and actions
interface BlogStoreState {
  blogs: Blog[];
  loading: boolean;
  error: Error | null;
  fetchBlogs: () => Promise<void>;
}

const useBlogStore = create<BlogStoreState>((set) => ({
  blogs: [],
  loading: false,
  error: null,
  fetchBlogs: async () => {
    set({ loading: true, error: null }); // Set loading to true, clear previous errors
    try {
      const response = await fetch("/json/Blogs.json");
      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.statusText}`);
      }
      const data: Blog[] = await response.json();
      set({ blogs: data, loading: false }); // Set blogs and loading to false on success
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err
          : new Error("An unknown error occurred while fetching blogs.");
      set({ error: errorMessage, loading: false, blogs: [] }); // Set error and loading to false
      console.error("Error fetching blogs:", errorMessage);
    }
  },
}));

export default useBlogStore;
