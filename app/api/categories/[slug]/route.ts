import { getCategoryModel } from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const Category = await getCategoryModel();

    const category = await Category.findOne({ slug });

    if (!category) throw new Error("Failed to find category!");

    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
