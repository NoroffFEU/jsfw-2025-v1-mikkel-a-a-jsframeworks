"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    clearCart,
  } = useCart();

  function handleCheckout() {
    clearCart();
    window.location.href = "/checkout-success";
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-lg border p-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 w-24 rounded object-cover"
                />

                <div className="flex-1">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p>${item.discountedPrice}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="rounded bg-gray-200 px-3 py-1"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="rounded bg-gray-200 px-3 py-1"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="rounded bg-red-500 px-3 py-2 text-white"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <p className="mb-4 text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </p>

            <button
              onClick={handleCheckout}
              className="rounded-lg bg-black px-5 py-3 text-white"
            >
              Checkout
            </button>
          </div>
        </>
      )}

      <div className="mt-6">
        <Link href="/" className="text-blue-600 underline">
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
