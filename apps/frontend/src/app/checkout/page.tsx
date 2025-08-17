"use client";

import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import useCartStore from "@/stores/CartStore";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const CheckoutPage: React.FC = () => {
  // const router = useRouter();
  const { carts } = useCartStore();

  // Use first cart's orderId or empty string
  const initialOrderId =
    carts.length > 0 && carts[0].orderId ? carts[0].orderId : "";

  const [form, setForm] = useState({
    address: "",
    orderId: initialOrderId,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!form.orderId) {
      setError("Order ID is required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${backendUrl}/api/bid/swap/${form.orderId}/pay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentMethod: "wallet",
            address: form.address,
          }),
        }
      );
      const data = await res.json();

      if (res.status === 200) {
        setMessage(data.message || "Payment successful!");
        setError(null);
      } else if (res.status === 400) {
        setError(
          data.message || "Invalid payment method or order already paid"
        );
      } else if (res.status === 404) {
        setError(data.message || "Order not found");
      } else {
        setError(data.message || "Internal server error");
      }
    } catch {
      setError("Network error or unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Order ID</label>
          <input
            name="orderId"
            type="text"
            required
            value={form.orderId}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Shipping Address</label>
          <input
            name="address"
            type="text"
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your shipping address"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition"
        >
          {loading ? "Processing..." : "Continue to Pay"}
        </button>
        {message && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutPage;
