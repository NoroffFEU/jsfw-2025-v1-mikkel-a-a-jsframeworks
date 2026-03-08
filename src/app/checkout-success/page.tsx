import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center p-8 text-center">
      <h1 className="mb-4 text-3xl font-bold">Checkout Successful</h1>

      <p className="mb-6 text-gray-600">
        Your order has been placed successfully.
      </p>

      <Link
        href="/"
        className="inline-block rounded-lg bg-black px-6 py-3 !text-white transition hover:bg-gray-800"
      >
        Back to Shop
      </Link>
    </main>
  );
}
