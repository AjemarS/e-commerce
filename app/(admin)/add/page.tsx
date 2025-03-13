import AddProductForm from "@/components/forms/ProductForm";
import React from "react";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="w-1/3">
        <AddProductForm />
      </div>
    </div>
  );
}
