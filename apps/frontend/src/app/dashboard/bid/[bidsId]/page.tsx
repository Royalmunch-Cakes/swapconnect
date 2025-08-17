"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CheckCircle, MapPin, XCircle } from "lucide-react";
import Image from "next/image";
import { API_URL } from "@/lib/config";
import { useAuthToken } from "@/hooks/useAuthToken";

interface Bids {
  image: string;
  brand: string;
  model: string;
  condition: string;
  batteryHealth: string;
  ram: string;
  color: string;
  storage: string;
  verified: boolean;
  currentBid: string;
  location: string;
  swapOffer: string;
  listedItem: string;
  status: string;
}

export default function BidsDetailsPage() {
  const { bidId } = useParams();
  const token = useAuthToken();
  const [bids, setBids] = useState<Bids | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!token || !bidId) return;
    const fetchBids = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/bids/${bidId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch order details");
        const data = await response.json();
        setBids(data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchBids();
  }, [token, bidId]);

  const handleAction = async () => {
    if (!token || !bidId) return;
    try {
      const response = await fetch(`${API_URL}/api/bid/${bidId}/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(`Failed to accept bid`);
      setShowSuccess(true);
      // Optionally update bid status locally to 'pending'
      setBids((prev) => (prev ? { ...prev, status: "pending" } : prev));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  if (loading) return <div className="p-8">Loading bid details...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!bids) return <div className="p-8">Bid not found.</div>;

  return (
    <div className="pt-[110px] pl-[252px] pr-8 pb-8 min-h-screen bg-[#F8F9FB] flex flex-col items-center justify-center relative">
      {/* Success Popup Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col items-center">
            <CheckCircle className="text-[#037F44] w-12 h-12 mb-4" />
            <h2 className="text-xl font-bold mb-2 text-[#037F44]">
              Bid Accepted!
            </h2>
            <p className="mb-4 text-center text-[#353535]">
              You have successfully accepted this bid.
            </p>
            <button
              className="bg-[#037F44] text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition"
              onClick={() => setShowSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full flex flex-col gap-8">
        {/* First Row: All bid details */}
        <div className="flex flex-col md:flex-row gap-8 border-b pb-8">
          <div className="flex flex-col items-center md:items-start">
            <Image
              src={bids.image}
              alt={bids.brand || bids.model || "Bid Image"}
              className="w-40 h-40 object-cover rounded-xl border"
              width={160}
              height={160}
            />
            <div className="mt-4 flex items-center gap-2">
              {bids.verified ? (
                <>
                  <CheckCircle className="text-[#037F44] w-5 h-5" />
                  <span className="text-xs text-[#037F44] font-semibold">
                    Verified
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="text-[#F87171] w-5 h-5" />
                  <span className="text-xs text-[#F87171] font-semibold">
                    Unverified
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <span className="font-medium text-[#848484]">Brand: </span>
              <span className="text-[#353535]">{bids.brand}</span>
            </div>
            <div>
              <span className="font-medium text-[#848484]">Condition: </span>
              <span className="text-[#353535]">{bids.condition}</span>
            </div>
            <div>
              <span className="font-medium text-[#848484]">Model: </span>
              <span className="text-[#353535]">{bids.model}</span>
            </div>
            <div>
              <span className="font-medium text-[#848484]">
                Battery Health:{" "}
              </span>
              <span className="text-[#353535]">{bids.batteryHealth}</span>
            </div>
            <div>
              <span className="font-medium text-[#848484]">RAM: </span>
              <span className="text-[#353535]">{bids.ram}</span>
            </div>
            <div>
              <span className="font-medium text-[#848484]">Color: </span>
              <span className="text-[#353535]">{bids.color}</span>
            </div>
            <div>
              <span className="font-medium text-[#848484]">Storage: </span>
              <span className="text-[#353535]">{bids.storage}</span>
            </div>
          </div>
        </div>
        {/* Second Row: Bid, location, swap offer, listed item, actions */}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <span className="font-medium text-[#848484]">Bid: </span>
              <span className="text-[#037F44] font-bold">
                {bids.currentBid}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#037F44]" />
              <span className="font-medium text-[#848484]">Location: </span>
              <span className="text-[#353535]">{bids.location}</span>
            </div>
            <div>
              <span className="font-medium text-[#848484]">Swap Offer: </span>
              <span className="text-[#353535]">{bids.swapOffer}</span>
            </div>
            <div>
              <span className="font-medium text-[#848484]">Listed Item: </span>
              <span className="text-[#353535]">{bids.listedItem}</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-6 md:mt-0">
            {!showSuccess &&
              bids.status !== "pending" &&
              bids.status !== "accepted" && (
                <button
                  className="bg-[#037F44] hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                  onClick={handleAction}
                  disabled={bids.status === "accepted"}
                >
                  Accept
                </button>
              )}
            {(bids.status === "pending" || showSuccess) && (
              <span className="text-[#037F44] font-semibold text-lg">
                Status: Pending
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
