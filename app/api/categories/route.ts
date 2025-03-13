import { getCategoryModel } from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ message: "All fields are required." });
    }

    const Category = await getCategoryModel();

    const category = await Category.create({ name });

    if (!category) throw new Error("Failed to add category!");

    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function GET() {
  try {
    const Category = await getCategoryModel();

    const categories = await Category.find().sort({ createdAt: -1 });

    if (!categories) throw new Error("Failed to receive categories!");

    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { name, slug } = await req.json();

    const Category = await getCategoryModel();

    const category = await Category.findOne({ slug });

    if (!category) throw new Error("Failed to receive category!");

    category.name = name;

    await category.save();

    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
