"use client";

import { usePathname } from "next/navigation";
import LayoutWrapper from "@/components/LayoutWrapper";
import React from "react";

interface GlobalLayoutContentProps {
  children: React.ReactNode;
}

export default function GlobalLayoutContent({
  children,
}: GlobalLayoutContentProps) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  // Only wrap with LayoutWrapper (navbar/footer) if not a dashboard route
  return isDashboard ? (
    <>{children}</>
  ) : (
    <LayoutWrapper>{children}</LayoutWrapper>
  );
}
