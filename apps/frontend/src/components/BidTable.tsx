"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle, MapPin } from "lucide-react";
import Link from "next/link";
// import Cookies from "js-cookie";
import { API_URL } from "@/lib/config";
import Image from "next/image";
import { useAuthToken } from "@/hooks/useAuthToken"; // Assuming you have a hook to get the auth token

interface Bids {
  id: string;
  image: string;
  currentBid: string;
  location: string;
  swapOffer: string;
  listedItem: string;
  verified: boolean;
  status: "request" | "in-progress";
}

function BidTable() {
  const [bids, setBids] = useState<Bids[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthToken();
  const [activeTab, setActiveTab] = useState<"requests" | "in-progress">(
    "requests"
  );

  // Filter bids by status
  const requests = bids.filter((bid) => bid.status === "request");
  const inProgress = bids.filter((bid) => bid.status === "in-progress");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    const fetchBids = async () => {
      try {
        const response = await fetch(`${API_URL}/api/bid/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("API Response:", data);
        // Combine sellerBids and buyerBids if present
        const allBids = [
          ...(Array.isArray(data.sellerBids) ? data.sellerBids : []),
          ...(Array.isArray(data.buyerBids) ? data.buyerBids : []),
        ];
        setBids(allBids);
      } catch {
        setBids([]);
        setLoading(false);
      }
    };
    fetchBids();
  }, [token]);

  return (
    <div className="pt-[110px] md:pl-[252px] pl-8 pr-8 pb-8 min-h-screen bg-[#F8F9FB]">
      <div className="flex gap-2 mb-8 ">
        <button
          className={`px-6 py-2 rounded-t-md text-[16px] font-semibold ${
            activeTab === "requests"
              ? "bg-[#037F44] text-white"
              : "bg-[#F8F9FB] text-[#037F44]"
          }`}
          onClick={() => setActiveTab("requests")}
        >
          Requests
        </button>
        <button
          className={`px-6 py-2 rounded-t-md text-[16px] font-semibold ${
            activeTab === "in-progress"
              ? "bg-[#037F44] text-white"
              : "bg-[#F8F9FB] text-[#037F44]"
          }`}
          onClick={() => setActiveTab("in-progress")}
        >
          In Progress
        </button>
      </div>

      {loading ? (
        <p>Loading bids...</p>
      ) : activeTab === "requests" ? (
        requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {requests.map((bid) => (
              <Link
                key={bid.id}
                href={`/dashboard/bid/${bid.id}`}
                className="bg-white rounded-xl shadow p-4 flex md:flex-col items-center relative"
              >
                <div className="w-28 h-28 mb-4 relative">
                  <Image
                    src={bid.image}
                    alt={bid.listedItem}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {bid.verified && (
                    <span className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                      <CheckCircle className="text-[#037F44]" size={20} />
                    </span>
                  )}
                </div>
                <div className="w-full flex flex-col gap-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold text-[#037F44] text-sm">
                      Current Bid: <span>{bid.currentBid}</span>
                    </p>
                    <span className="flex items-center text-xs text-[#353535]">
                      <MapPin className="w-4 h-4 mr-1 text-[#037F44]" />
                      {bid.location.split(",")[0]}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#848484]">Swap Offer</span>
                    <span className="text-xs text-[#353535]">
                      {bid.swapOffer}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#848484]">Listed Item</span>
                    <span className="text-xs text-[#353535]">
                      {bid.listedItem}
                    </span>
                  </div>
                  {bid.verified && (
                    <div className="flex items-center mt-2">
                      <CheckCircle className="text-[#037F44] w-4 h-4 mr-1" />
                      <span className="text-xs text-[#037F44] font-semibold">
                        Verified
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )
      ) : inProgress.length === 0 ? (
        <p>No in-progress bids found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {inProgress.map((bid) => (
            <Link
              key={bid.id}
              href={`/dashboard/bid/${bid.id}`}
              className="bg-white rounded-xl shadow p-4 flex md:flex-col items-center relative"
            >
              <div className="w-28 h-28 mb-4 relative">
                <Image
                  src={bid.image}
                  alt={bid.listedItem}
                  className="w-full h-full object-cover rounded-lg"
                />
                {bid.verified && (
                  <span className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                    <CheckCircle className="text-[#037F44]" size={20} />
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col gap-1">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold text-[#037F44] text-sm">
                    Current Bid: <span>{bid.currentBid}</span>
                  </p>
                  <span className="flex items-center text-xs text-[#353535]">
                    <MapPin className="w-4 h-4 mr-1 text-[#037F44]" />
                    {bid.location.split(",")[0]}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#848484]">Swap Offer</span>
                  <span className="text-xs text-[#353535]">
                    {bid.swapOffer}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#848484]">Listed Item</span>
                  <span className="text-xs text-[#353535]">
                    {bid.listedItem}
                  </span>
                </div>
                {bid.verified && (
                  <div className="flex items-center mt-2">
                    <CheckCircle className="text-[#037F44] w-4 h-4 mr-1" />
                    <span className="text-xs text-[#037F44] font-semibold">
                      Verified
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default BidTable;
