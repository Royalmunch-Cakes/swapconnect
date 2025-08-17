"use client";

import React from "react";
// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";

export default function ProductCategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Navbar /> */}
      <main className="min-h-screen bg-white">{children}</main>
      {/* <Footer /> */}
    </>
  );
}
