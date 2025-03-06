import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  await connectDB();

  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ message: "All fields are required." });
    }

    const category = await Category.create({ name });
    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  await connectDB();

  try {
    const products = await Category.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
