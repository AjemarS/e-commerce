import React from "react";
import ProductForm from "@/components/forms/ProductForm";
import { auth, signIn } from "@/lib/auth";

export default async function UpdateProductsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();

  if (!session) {
    await signIn();
  }

  if (session?.user.role !== "admin") {
    return <div>You are not supposed to be here. Get out!</div>;
  }

  const { slug } = await params;

  const product = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`, {
    cache: "no-store",
  }).then(async (res) => {
    const data = await res.json();

    if (data.message) console.error(data.message);

    return data;
  });

  return (
    <div className="container flex justify-center items-center h-screen">
      <div className="w-1/3">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
