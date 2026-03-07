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
      className="rounded-lg bg-black px-5 py-3 text-white"
    >
      Add to Cart
    </button>
  );
}