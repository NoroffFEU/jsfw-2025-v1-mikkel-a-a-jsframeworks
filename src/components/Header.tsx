"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          Online Shop
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-black">
            Home
          </Link>

          <Link href="/contact" className="hover:text-black">
            Contact
          </Link>

          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full bg-black px-5 py-2 font-semibold !text-white shadow hover:bg-gray-800"
          >
            🛒 Cart
            <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-black">
              {cartCount}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
