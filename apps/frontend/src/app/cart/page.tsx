"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useCartStore from "../../stores/CartStore";

interface CartItem {
  id: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
}

const shippingOptions = [
  { label: "Standard (₦1,000)", value: 1000 },
  { label: "Express (₦2,500)", value: 2500 },
  { label: "Pickup (₦0)", value: 0 },
];

const Cart: React.FC = () => {
  const { removeFromCart, updateQuantity, carts } = useCartStore();
  const [coupon, setCoupon] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<string>("");
  const [shipping, setShipping] = useState<number>(shippingOptions[0].value);

  // Calculate subtotal
  const subtotal = carts.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  // Example: apply a fake coupon for demo
  const handleApplyCoupon = () => {
    if (coupon.trim().toLowerCase() === "discount10") {
      setAppliedCoupon("₦1,000 discount applied!");
    } else {
      setAppliedCoupon("Invalid coupon code.");
    }
  };

  const total = subtotal + shipping;

  if (carts.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center shadow-sm mx-auto my-8 max-w-2xl px-4">
        <Image
          src="/empty-cart.svg"
          alt="Empty cart"
          width={100}
          height={100}
          className="mx-auto mb-4 opacity-70"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
        <h2 className="mb-2 text-2xl font-semibold text-gray-700">
          Your cart is empty
        </h2>
        <p className="mb-6 text-gray-500">
          Add some products to see them here.
        </p>
        <Link href="/shop" passHref>
          <button className="rounded-full bg-green-700 px-6 py-3 cursor-pointer font-semibold text-white transition-colors duration-200 hover:bg-green-800">
            Go to shop
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto my-8 max-w-4xl px-4">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Shopping Cart</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Subtotal</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cartItem: CartItem) => (
              <tr className="border-b" key={cartItem.id}>
                <td className="py-3 px-4">
                  <div className="relative h-16 w-16">
                    <Image
                      src={cartItem.image || "/placeholder.svg"}
                      alt={cartItem.name}
                      fill
                      className="object-contain rounded"
                    />
                  </div>
                </td>
                <td className="py-3 px-4 font-medium">{cartItem.name}</td>
                <td className="py-3 px-4 text-green-700 font-semibold">
                  ₦{Number(cartItem.price).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(cartItem.id, cartItem.quantity - 1)
                      }
                      className="rounded-md border border-gray-300 bg-gray-100 px-2 py-1 font-semibold text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                      disabled={cartItem.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="min-w-[24px] text-center font-medium text-gray-800">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(cartItem.id, cartItem.quantity + 1)
                      }
                      className="rounded-md border border-gray-300 bg-gray-100 px-2 py-1 font-semibold text-gray-700 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4 font-semibold">
                  ₦
                  {(Number(cartItem.price) * cartItem.quantity).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => removeFromCart(cartItem.id)}
                    className="rounded-md bg-red-500 px-4 py-1 font-semibold text-white hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Single Coupon Row Below All Cart Items */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 mt-4">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-64"
        />
        <button
          type="button"
          onClick={handleApplyCoupon}
          className="bg-green-700 text-white px-4 py-2 rounded font-semibold hover:bg-green-800"
        >
          Apply Coupon
        </button>
        {appliedCoupon && (
          <span className="ml-4 text-sm text-green-700 font-medium">
            {appliedCoupon}
          </span>
        )}
      </div>

      {/* Cart Totals Table */}
      <div className="mt-8 max-w-md ml-auto">
        <h3 className="text-lg font-bold mb-4">Cart Totals</h3>
        <table className="w-full bg-white rounded-lg shadow">
          <tbody>
            <tr>
              <td className="py-2 px-4 font-medium">Subtotal</td>
              <td className="py-2 px-4 text-right">
                ₦{subtotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">Shipping</td>
              <td className="py-2 px-4 text-right">
                <select
                  value={shipping}
                  onChange={(e) => setShipping(Number(e.target.value))}
                  className="border px-2 py-1 rounded"
                >
                  {shippingOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr className="border-t">
              <td className="py-2 px-4 font-bold">Total</td>
              <td className="py-2 px-4 text-right font-bold text-green-700 text-lg">
                ₦{total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-6 text-center">
          <Link href="/checkout" passHref>
            <button className="rounded-full bg-green-700 px-10 py-4 cursor-pointer text-lg font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-green-800">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
