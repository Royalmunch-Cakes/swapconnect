"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, MapPin, XCircle } from "lucide-react";
import Image from "next/image";
import { API_URL } from "@/lib/config";
import { useAuthToken } from "@/hooks/useAuthToken";

interface Order {
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

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const token = useAuthToken();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !orderId) return;
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch order details");
        const data = await response.json();
        setOrder(data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [token, orderId]);

  const handleAction = async (action: "accept" | "decline") => {
    if (!token || !orderId) return;
    try {
      const response = await fetch(
        `${API_URL}/api/orders/${orderId}/${action}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error(`Failed to ${action} order`);
      alert(`Order ${action}ed successfully!`);
      router.push("/dashboard/orders");
    } catch (err) {
      alert((err as Error).message);
    }
  };

  if (loading) return <div className="p-8">Loading order details...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!order) return <div className="p-8">Order not found.</div>;

  return (
    <div className="pt-[110px] pl-[252px] pr-8 pb-8 min-h-screen bg-[#F8F9FB] flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full flex flex-col gap-8">
        {/* First Row: All order details */}
        <div className="flex flex-col md:flex-row gap-8 border-b pb-8">
          <div className="flex flex-col items-center md:items-start">
            <Image
              src={order.image}
              alt={order.brand || order.model || "Order Image"}
              className="w-40 h-40 object-cover rounded-xl border"
              width={160}
              height={160}
            />
            <div className="mt-4 flex items-center gap-2">
              {order.verified ? (
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
              <span className="text-[#353535]">{order.brand}</span>
            </div>
            <div>
              <span className="font-medium text-[#848484]">Condition: </span>
              <span className="text-[#353535]">{order.condition}</span>
            </div>
            <div>
              <span className="font-medium text-[#848484]">Model: </span>
              <span className="text-[#353535]">{order.model}</span>
            </div>
            <div>
              <span className="font-medium text-[#848484]">
                Battery Health:{" "}
              </span>
              <span className="text-[#353535]">{order.batteryHealth}</span>
            </div>
            <div>
              <span className="font-medium text-[#848484]">RAM: </span>
              <span className="text-[#353535]">{order.ram}</span>
            </div>
            <div>
              <span className="font-medium text-[#848484]">Color: </span>
              <span className="text-[#353535]">{order.color}</span>
            </div>
            <div>
              <span className="font-medium text-[#848484]">Storage: </span>
              <span className="text-[#353535]">{order.storage}</span>
            </div>
          </div>
        </div>
        {/* Second Row: Bid, location, swap offer, listed item, actions */}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <span className="font-medium text-[#848484]">Bid: </span>
              <span className="text-[#037F44] font-bold">
                {order.currentBid}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#037F44]" />
              <span className="font-medium text-[#848484]">Location: </span>
              <span className="text-[#353535]">{order.location}</span>
            </div>
            <div>
              <span className="font-medium text-[#848484]">Swap Offer: </span>
              <span className="text-[#353535]">{order.swapOffer}</span>
            </div>
            <div>
              <span className="font-medium text-[#848484]">Listed Item: </span>
              <span className="text-[#353535]">{order.listedItem}</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-6 md:mt-0">
            <button
              className="bg-[#037F44] hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              onClick={() => handleAction("accept")}
              disabled={order.status === "accepted"}
            >
              Accept
            </button>
            <button
              className="bg-[#F87171] hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              onClick={() => handleAction("decline")}
              disabled={order.status === "declined"}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
