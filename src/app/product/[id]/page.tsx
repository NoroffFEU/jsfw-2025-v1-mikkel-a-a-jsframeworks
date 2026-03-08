import Image from "next/image";
import { getProductById } from "@/lib/api";
import AddToCartButton from "@/components/AddToCartButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  const imageSrc =
    product.image?.url || "https://placehold.co/600x400?text=No+Image";

  const hasDiscount = product.discountedPrice < product.price;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-10 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src={imageSrc}
            alt={product.image?.alt || product.title}
            width={700}
            height={500}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h1 className="mb-4 text-4xl font-bold">{product.title}</h1>

          <p className="mb-6 text-lg leading-7 text-slate-600">
            {product.description}
          </p>

          <div className="mb-4 flex items-center gap-3">
            {hasDiscount ? (
              <>
                <span className="text-xl text-slate-400 line-through">
                  ${product.price}
                </span>
                <span className="text-3xl font-bold text-emerald-600">
                  ${product.discountedPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold">${product.price}</span>
            )}
          </div>

          <p className="mb-6 text-slate-700">⭐ {product.rating}</p>

          <AddToCartButton
            product={{
              id: product.id,
              title: product.title,
              price: product.price,
              discountedPrice: product.discountedPrice,
              image: imageSrc,
            }}
          />
        </div>
      </div>

      {product.tags && product.tags.length > 0 && (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-4 text-xl font-bold">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {product.reviews && product.reviews.length > 0 && (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-6 text-2xl font-bold">Reviews</h2>

          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-semibold">{review.username}</p>
                  <p className="text-sm text-slate-600">⭐ {review.rating}</p>
                </div>
                <p className="text-slate-700">{review.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
