import Link from "next/link";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const discount =
    product.discountedPrice < product.price
      ? Math.round(
          ((product.price - product.discountedPrice) / product.price) * 100
        )
      : 0;

  return (
    <Link href={`/product/${product.id}`}>
      <div className="border rounded-lg p-4 transition hover:shadow-lg">
        <img
          src={product.image}
          alt={product.title}
          className="mb-2 h-48 w-full object-cover"
        />

        <h2 className="font-semibold">{product.title}</h2>

        <div className="flex items-center gap-2">
          {product.discountedPrice < product.price ? (
            <>
              <span className="text-gray-400 line-through">
                ${product.price}
              </span>
              <span className="font-bold text-green-600">
                ${product.discountedPrice}
              </span>
            </>
          ) : (
            <span>${product.price}</span>
          )}
        </div>

        {discount > 0 && (
          <div className="text-sm text-red-500">{discount}% off</div>
        )}

        <div className="text-sm">⭐ {product.rating}</div>
      </div>
    </Link>
  );
}