import { getProductModel } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const Product = await getProductModel();

    const product = await Product.findOne({ slug });

    if (!product) throw new Error("Failed to find product!");

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
