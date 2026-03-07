"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4">
      <Link href="/" className="text-2xl font-bold">
        Online Shop
      </Link>

      <nav className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/cart">Cart ({cartCount})</Link>
      </nav>
    </header>
  );
}