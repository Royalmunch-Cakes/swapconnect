"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Filter } from "lucide-react";
import { Input } from "./ui/input";
import { useAuthToken } from "@/hooks/useAuthToken";
import { API_URL } from "@/lib/config";
import { useRouter } from "next/navigation";

// --- Remove hardcoded 'stats' and 'transactions' arrays from here ---

interface WalletData {
  // Renamed to avoid conflict with state variable
  balance: number;
  availableBalance: number; // Assuming this exists based on your backend
}

interface Stat {
  totalEarnings: string; // Consider 'number' if your API sends a number
  totalSpent: string;
  pendingEarnings: string;
  totalSold: string; // Consider 'number'
}

interface Transaction {
  id: string;
  name: string;
  description: string;
  amount: string; // Or number, see formatting suggestion below
  date: string;
  status: string;
}

// Helper object for stat display logic
const statDisplayMap = {
  totalEarnings: { label: "Total Earnings", color: "#353535" },
  totalSpent: { label: "Total Spent", color: "#353535" },
  pendingEarnings: { label: "Pending Earnings", color: "#353535" },
  totalSold: { label: "Total Sold", color: "#353535" },
};

export default function Wallet() {
  const [balance, setBalance] = useState<WalletData | null>(null);
  const [stats, setStats] = useState<Stat | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  const token = useAuthToken(); // Use the custom hook to get the token
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setLoading(false); // If no token, stop loading and don't fetch
      return;
    }

    const fetchWalletData = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const response = await fetch(`${API_URL}/api/wallet/transactions`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Correct template literal
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("API Response:", data);

        if (data?.data) {
          setBalance(data.data.wallet);
          setStats(data.data.stats);
          // Ensure data.data.transactions.items is an array before setting
          if (Array.isArray(data.data.transactions?.items)) {
            setTransactions(data.data.transactions.items);
          } else {
            console.warn(
              "API did not return transactions.items as an array:",
              data.data.transactions
            );
            setTransactions([]); // Default to empty array if not as expected
          }
        } else {
          console.error("Unexpected API response format:", data);
          setError("Failed to load data: Unexpected API response format.");
        }
      } catch (err) {
        // TypeScript will infer 'err' as 'unknown' by default
        console.error("Error fetching wallet data:", err);
        if (err instanceof Error) {
          // Type guard: check if err is an instance of Error
          setError(`Error fetching data: ${err.message}`);
        } else if (typeof err === "string") {
          // Optional: handle if error is a string
          setError(`Error fetching data: ${err}`);
        } else {
          // Fallback for other unexpected error types
          setError("Error fetching data: An unknown error occurred.");
        }
        setBalance(null);
        setStats(null);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [token]); // Dependency array: re-run when token changes

  if (loading) {
    return (
      <div className="pt-[110px] md:pl-[252px] pl-8 pr-8 pb-8 min-h-screen bg-[#F8F9FB] flex justify-center items-center">
        Loading wallet data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-[110px] md:pl-[252px] pl-8 pr-8 pb-8 min-h-screen bg-[#F8F9FB] flex flex-col justify-center items-center text-red-600">
        <p>{error}</p>
        <p className="text-sm text-gray-500 mt-2">
          Please try refreshing the page or check your network connection.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-[110px] md:pl-[252px] pl-8 pr-8 pb-8 min-h-screen bg-[#F8F9FB]">
      {/* Section 1: Wallet Balance and Stats */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10">
        {/* Wallet Balance Card */}
        <div className="flex flex-col md:flex-row md:w-[497px] md:h-[223px] h-[168px] w-[343px] bg-white rounded-xl shadow p-6 flex justify-between">
          <div className="flex md:flex-col justify-between">
            <div className="flex flex-col">
              <div className="text-[#848484] text-[15px] mb-2 font-medium">
                Wallet Balance
              </div>
              <div className="md:text-[32px] font-bold text-[#037F44] mb-6">
                ₦{balance?.balance?.toLocaleString() || "0.00"}
              </div>
            </div>

            <Image
              src="/Sketch.png"
              alt="Wallet illustration"
              width={60}
              height={60}
              className="w-[60px] h-[60px] md:w-[120px] md:h-[120px]"
            />
          </div>
          <div className="flex md:flex-col justify-between">
            <button
              className="border bg-[#037F44] w-[137px] md:h-[48px] h-[40px] rounded-md text-white text-[16px]"
              onClick={() => router.push("/dashboard/wallet/withdraw")}
            >
              Withdraw
            </button>
            <button
              className="flex items-center justify-center gap-2 border bg-white border-[#037F44] text-[#037F44] w-[174px] md:h-[48px] h-[40px] rounded-md text-[16px]"
              onClick={() => router.push("/dashboard/wallet/fund")}
            >
              <Plus width={16} height={16} />
              Fund Wallet
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-2 gap-4">
          {stats &&
            Object.entries(stats).map(([key, value]) => {
              const displayInfo =
                statDisplayMap[key as keyof typeof statDisplayMap]; // Type assertion for safety
              if (!displayInfo) return null; // Handle unexpected keys

              // Format value based on key type (assuming currency for earnings/spent, number for totalSold)
              const formattedValue =
                key === "totalSold"
                  ? value // "value" is already a string here
                  : `₦${parseFloat(value as string).toLocaleString()}`; // Convert to number, then format

              return (
                <div
                  key={key}
                  className="rounded-xl shadow bg-white flex flex-col md:w-[228px] w-[168px] h-[97px] items-center justify-center p-6"
                >
                  <div className="text-[14px] text-[#BEBEBE] font-medium mb-2">
                    {displayInfo.label}
                  </div>
                  <div
                    className="text-[24px] font-bold"
                    style={{ color: displayInfo.color }}
                  >
                    {formattedValue}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Section 2: Transaction History Table */}
      <div className="mb-4 mt-2">
        <div className="flex flex-col gap-4 mb-4">
          <h3 className="hidden md:flex text-xl font-bold text-[#353535]">
            Transaction History
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 mb-8">
              <Input
                placeholder="Search product's name, category...."
                className="bg-white border w-[300px] md:w-[900px] "
              />
              <button className="hidden md:flex items-center gap-2 bg-[#F8F9FB] border border-[#E5E7EB] px-4 py-2 rounded-md text-[#353535] hover:bg-[#e6f9f0] transition">
                <Filter size={18} />
                <span className="font-medium text-[15px]">Filter</span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white hidden md:block ">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#CCDCD4]">
                <th className="text-left px-4 py-3 text-[#505050] text-[14px]">
                  TRANSACTION ID
                </th>
                <th className="text-left px-4 py-3 text-[#505050] text-[14px]">
                  NAME
                </th>
                <th className="text-left px-4 py-3 text-[#505050] text-[14px]">
                  DESCRIPTION
                </th>
                <th className="text-left px-4 py-3 text-[#505050] text-[14px]">
                  AMOUNT
                </th>
                <th className="text-left px-4 py-3 text-[#505050] text-[14px]">
                  DATE
                </th>
                <th className="text-left px-4 py-3 text-[#505050] text-[14px]">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-[#848484]">
                    No transactions found for this user.
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-white">
                    <td className="px-4 py-3 text-[#434343] text-[14px]">
                      {tx.id}
                    </td>
                    <td className="px-4 py-3 text-[#434343] text-[14px]">
                      {tx.name}
                    </td>
                    <td className="px-4 py-3 text-[#434343] text-[14px]">
                      {tx.description}
                    </td>
                    <td
                      className={`px-4 py-3 text-[14px] font-semibold ${
                        tx.amount.startsWith("+")
                          ? "text-[#037F44]"
                          : "text-[#F87171]"
                      }`}
                    >
                      {/* Assuming tx.amount is like "+$500" or "-$200" */}
                      {tx.amount.startsWith("+") ? "₦" : "-₦"}
                      {Math.abs(
                        parseFloat(tx.amount.replace(/[^0-9.]+/g, ""))
                      ).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-[#434343] text-[14px]">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-[#434343] text-[14px]">
                      {tx.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4 md:hidden">
          {transactions.length === 0 ? (
            <div className="text-center py-4 text-[#848484] bg-white rounded-lg shadow">
              No transactions found for this user.
            </div>
          ) : (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className="bg-white rounded-lg shadow px-4 py-3 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-[#353535]">
                      {tx.name}
                    </div>
                    <div className="text-xs text-[#848484]">
                      {tx.description}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div
                      className={`font-semibold text-[15px] ${
                        tx.amount.startsWith("+")
                          ? "text-[#037F44]"
                          : "text-[#F87171]"
                      }`}
                    >
                      {tx.amount.startsWith("+") ? "₦" : "-₦"}
                      {Math.abs(
                        parseFloat(tx.amount.replace(/[^0-9.]+/g, ""))
                      ).toLocaleString()}
                    </div>
                    <div
                      className={`mt-1 text-xs px-2 py-1 rounded ${
                        tx.status === "Completed"
                          ? "bg-[#E8F0FF] text-[#037F44]"
                          : tx.status === "Pending"
                          ? "bg-[#FFF3E8] text-[#D1A941]"
                          : "bg-[#F8F9FB] text-[#353535]"
                      }`}
                    >
                      {tx.status}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
