'use client';

import type React from 'react';

import { Nunito } from 'next/font/google';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/ui/sidebar';
import Navbar from '@/components/ui/nav';
import '../globals.css';

const nunito = Nunito({
  weight: ['400', '500', '700', '800', '900'],
  subsets: ['latin'],
});

const pathTitleMap: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/dashboard/products': 'Products',
  '/dashboard/orders': 'Orders',
  '/dashboard/wallet': 'Wallet',
  '/dashboard/wallet/fund': 'Fund Wallet',
  '/dashboard/wallet/fund/verify': 'Payment Verification',
  '/dashboard/wallet/withdraw': 'Withdraw Funds',
  '/dashboard/settings': 'Settings',
  '/dashboard/bid': 'Bids',
  '/dashboard/support': 'Support',
};

function getTitleFromPath(pathname: string) {
  const exactMatch = pathTitleMap[pathname];
  if (exactMatch) return exactMatch;

  const match = Object.keys(pathTitleMap).find((key) =>
    pathname.startsWith(key)
  );
  return pathTitleMap[match ?? '/dashboard'];
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);

  return (
    <div className={`${nunito.className} flex min-h-screen w-full`}>
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title={title} />
        <main className="flex-1 w-full">{children}</main>
      </div>
    </div>
  );
}
