import { getProductById } from "@/lib/api";
import AddToCartButton from "@/components/AddToCartButton";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  const hasDiscount = product.discountedPrice < product.price;

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="grid gap-8 md:grid-cols-2">
        <img
          src={product.image}
          alt={product.title}
          className="w-full rounded-lg object-cover"
        />

        <div>
          <h1 className="mb-4 text-3xl font-bold">{product.title}</h1>

          <p className="mb-4 text-gray-600">{product.description}</p>

          <div className="mb-4 flex items-center gap-3">
            {hasDiscount ? (
              <>
                <span className="text-gray-400 line-through">
                  ${product.price}
                </span>
                <span className="text-2xl font-bold text-green-600">
                  ${product.discountedPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold">${product.price}</span>
            )}
          </div>

          <p className="mb-4">⭐ {product.rating}</p>

          <AddToCartButton
            product={{
              id: product.id,
              title: product.title,
              price: product.price,
              discountedPrice: product.discountedPrice,
              image: product.image,
            }}
          />
        </div>
      </div>

      {product.tags && product.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-200 px-3 py-1 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {product.reviews && product.reviews.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">Reviews</h2>

          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="rounded-lg border p-4">
                <p className="font-semibold">{review.username}</p>
                <p className="text-sm">⭐ {review.rating}</p>
                <p className="mt-2 text-gray-700">{review.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}