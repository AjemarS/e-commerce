import { getProductModel } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, price, stock, category, description, image } = await req.json();

    if (!name || !price || !stock || !category) {
      return NextResponse.json({ message: "All fields are required." });
    }

    const Product = await getProductModel();

    const product = await Product.create({
      name,
      price,
      stock,
      category,
      description,
      image,
    });

    if (!product) throw new Error("Failed to add product!");

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function GET(req: NextRequest) {
  try {
    const Product = await getProductModel();

    const products = await Product.find().sort({ createdAt: -1 });

    if (!products) throw new Error("Failed to receive products!");

    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
