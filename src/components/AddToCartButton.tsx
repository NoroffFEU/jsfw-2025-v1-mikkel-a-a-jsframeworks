"use client";

import { useCart } from "@/context/CartContext";

interface Props {
  product: {
    id: string;
    title: string;
    price: number;
    discountedPrice: number;
    image: string;
  };
}

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-slate-800"
    >
      Add to Cart
    </button>
  );
}
