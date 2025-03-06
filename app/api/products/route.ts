import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, price, category, description, image } = await req.json();

    if (!name || !price || !category) {
      return NextResponse.json({ message: "All fields are required." });
    }

    await connectDB();

    const product = await Product.create({ name, price, category, description, image });
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function GET(req: NextRequest) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
