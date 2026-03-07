"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Online Shop</h1>

      <input
        type="text"
        placeholder="Search products..."
        className="mb-6 w-full rounded border p-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}