"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import useBlogStore from "../../stores/BlogStore";

const BlogSection: React.FC = () => {
  const { blogs, loading, error, fetchBlogs } = useBlogStore();

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]); // fetchBlogs is stable due to Zustand

  return (
    <section className="container max-w-6xl mx-auto my-10 px-4 md:px-0">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-2 text-gray-800">
        Latest Updates
      </h2>
      <p className="text-center text-lg text-gray-600 mb-8">
        Get the latest technology gists & more...
      </p>

      {/* Loading, Error, or No Blogs States */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          {/* Tailwind CSS Spinner */}
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-700"></div>
          <span className="ml-3 text-lg text-gray-600">
            Loading blog posts...
          </span>
        </div>
      ) : error ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">
            Failed to load blog posts: {error.message}. Please try again later.
          </span>
        </div>
      ) : blogs.length === 0 ? (
        <div
          className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative text-center"
          role="alert"
        >
          <strong className="font-bold">Info!</strong>
          <span className="block sm:inline ml-2">No blog posts found.</span>
        </div>
      ) : (
        // Blog Grid - Replaces Row and Col
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {blogs.map((blog) => (
            // Blog Card - Replaces Card component
            <div
              key={blog.id} // Ensure blog.id is unique for each blog post in Blogs.json
              className="flex w-full" // Use flex to ensure card takes full height in the grid item
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col w-full">
                {/* Image */}
                <div className="relative w-full h-56 md:h-48 overflow-hidden bg-gray-100 flex justify-center items-center">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover" // Use cover to make image fill space
                    className="transition-transform duration-300 hover:scale-110" // Subtle zoom effect
                  />
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-700 text-sm line-clamp-3 flex-grow">
                    {blog.excerpt}
                  </p>
                  {/* Optional: Add a "Read More" link */}
                  <a
                    href="#"
                    className="text-green-700 hover:underline mt-4 self-start"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BlogSection;
