import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const hasDiscount = product.discountedPrice < product.price;

  const discount = hasDiscount
    ? Math.round(
        ((product.price - product.discountedPrice) / product.price) * 100,
      )
    : 0;

  const imageSrc =
    product.image?.url || "https://placehold.co/400x300?text=No+Image";

  return (
    <Link href={`/product/${product.id}`}>
      <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative">
          <Image
            src={imageSrc}
            alt={product.image?.alt || product.title}
            width={400}
            height={300}
            className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />

          {hasDiscount && (
            <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow">
              -{discount}%
            </span>
          )}
        </div>

        <div className="space-y-3 p-4">
          <h2 className="line-clamp-1 text-lg font-semibold">
            {product.title}
          </h2>

          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-sm text-slate-400 line-through">
                  ${product.price}
                </span>
                <span className="text-lg font-bold text-emerald-600">
                  ${product.discountedPrice}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">${product.price}</span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>⭐ {product.rating}</span>
            <span className="font-medium text-slate-800 group-hover:underline">
              View product
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
