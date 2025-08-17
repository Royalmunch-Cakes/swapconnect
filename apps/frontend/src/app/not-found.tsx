"use client";

import Link from "next/link";
import React from "react";

const NotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
    <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
    <p className="text-gray-600 mb-6">
      Sorry, the page you are looking for does not exist.
    </p>
    <Link
      href="/"
      className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
    >
      Go Home
    </Link>
  </div>
);

export default NotFound;
