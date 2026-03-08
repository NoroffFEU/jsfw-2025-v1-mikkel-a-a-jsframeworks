"use client";

import { useEffect, useMemo, useState } from "react";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

type SortOption = "default" | "price-low" | "price-high" | "rating-high";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    );

    if (sortBy === "price-low") {
      return [...filtered].sort(
        (a, b) => a.discountedPrice - b.discountedPrice,
      );
    }

    if (sortBy === "price-high") {
      return [...filtered].sort(
        (a, b) => b.discountedPrice - a.discountedPrice,
      );
    }

    if (sortBy === "rating-high") {
      return [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [products, search, sortBy]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">Online Shop</h1>

        <p className="mb-6 max-w-2xl text-slate-600">
          Browse products, find deals, and add your favorites to your cart.
        </p>

        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <label className="sr-only" htmlFor="search">
            Search products
          </label>

          <input
            id="search"
            name="search"
            type="text"
            placeholder="Search products..."
            className="w-full rounded-xl border border-slate-300 bg-white p-3 outline-none transition focus:border-slate-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <label className="sr-only" htmlFor="sort">
            Sort products
          </label>

          <select
            id="sort"
            name="sort"
            className="rounded-xl border border-slate-300 bg-white p-3 outline-none transition focus:border-slate-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
          >
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to high</option>
            <option value="price-high">Price: High to low</option>
            <option value="rating-high">Rating: High to low</option>
          </select>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
