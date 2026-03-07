import { Product } from "@/types/product";

const BASE_URL = "https://v2.api.noroff.dev";

interface ProductsResponse {
  data: Product[];
}

interface ProductResponse {
  data: Product;
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/online-shop`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const json: ProductsResponse = await response.json();
  return json.data;
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/online-shop/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const json: ProductResponse = await response.json();
  return json.data;
}